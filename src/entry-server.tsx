import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import App from "./App";

export function render(url: string) {
  try {
    // Create a new QueryClient for SSR
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: Infinity,
          gcTime: Infinity,
        },
      },
    });
    
    // Render the React app with StaticRouter for the specific route
    const appHtml = renderToString(
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </TooltipProvider>
      </QueryClientProvider>
    );
    
    return { appHtml, headTags: '' };
  } catch (error) {
    console.error('SSR Error:', error);
    // Return a basic HTML structure if SSR fails
    return { 
      appHtml: `<div class="min-h-screen flex items-center justify-center"><h1>Loading...</h1></div>`, 
      headTags: '' 
    };
  }
}
