import Groq from "groq-sdk";
import { useWindowStore } from "../store/windowStore";
import { useSystemStore } from "../store/systemStore";

// Initialize Groq. Note: In a real production app, never expose your API key in the client side.
// Since this is a local Web OS, we read from Vite's env vars.
const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY || "dummy_key_to_prevent_crash",
  dangerouslyAllowBrowser: true // Required for client-side use
});

export class VoiceAgent {
  recognition: any;
  isListening: boolean = false;

  constructor() {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';

      this.recognition.onresult = async (event: any) => {
        const transcript = event.results[0][0].transcript;
        console.log("Heard:", transcript);
        await this.processCommand(transcript);
      };

      this.recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        this.isListening = false;
      };
      
      this.recognition.onend = () => {
        this.isListening = false;
      }
    } else {
      console.warn("Speech Recognition API not supported in this browser.");
    }
  }

  startListening() {
    if (this.recognition && !this.isListening) {
      this.recognition.start();
      this.isListening = true;
      console.log("Listening...");
    }
  }

  async processCommand(transcript: string) {
    if (!import.meta.env.VITE_GROQ_API_KEY) {
      this.speak("I need a Groq API key to process commands.");
      return;
    }

    try {
      const response = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are the AI assistant for a Web OS. Based on the user's command, call the appropriate tool. If you open an app, use 'openApp' with the app ID (e.g., 'youtube', 'settings', 'browser'). If changing theme, use 'changeTheme' ('dark' or 'light'). If the command is unrecognized, reply naturally."
          },
          {
            role: "user",
            content: transcript
          }
        ],
        model: "llama3-8b-8192",
        tools: [
          {
            type: "function",
            function: {
              name: "openApp",
              description: "Open an application in the Web OS",
              parameters: {
                type: "object",
                properties: {
                  appId: { type: "string", description: "The ID of the app to open (e.g., youtube, settings, browser, fileExplorer)" },
                  title: { type: "string", description: "The display name of the app" }
                },
                required: ["appId", "title"]
              }
            }
          },
          {
            type: "function",
            function: {
              name: "changeTheme",
              description: "Change the OS theme to dark or light mode",
              parameters: {
                type: "object",
                properties: {
                  theme: { type: "string", enum: ["dark", "light"], description: "The theme to switch to" }
                },
                required: ["theme"]
              }
            }
          }
        ]
      });

      const message = response.choices[0]?.message;
      if (message?.tool_calls) {
        for (const toolCall of message.tool_calls) {
          if (toolCall.function?.name === 'openApp') {
            const args = JSON.parse(toolCall.function.arguments || "{}");
            useWindowStore.getState().openWindow(args.appId, args.title, args.appId);
            this.speak(`Opening ${args.title}`);
          } else if (toolCall.function?.name === 'changeTheme') {
            const args = JSON.parse(toolCall.function.arguments || "{}");
            useSystemStore.getState().setTheme(args.theme);
            this.speak(`Switched to ${args.theme} mode`);
          }
        }
      } else if (message?.content) {
         this.speak(message.content);
      }
    } catch (error) {
      console.error("Groq API error:", error);
      this.speak("Sorry, I encountered an error communicating with the AI server.");
    }
  }

  speak(text: string) {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  }
}

export const voiceAgent = new VoiceAgent();
