import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";
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

    const helmetContext: { helmet?: any } = {};
    
    // Render the React app with StaticRouter for the specific route
    const appHtml = renderToString(
      <HelmetProvider context={helmetContext}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <StaticRouter location={url}>
              <App />
            </StaticRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </HelmetProvider>
    );
    
    const { helmet } = helmetContext;
    const headTags = helmet ? helmet.title.toString() + helmet.meta.toString() : '';
    
    return { appHtml, headTags };
  } catch (error) {
    console.error('SSR Error:', error);
    // Return a basic HTML structure if SSR fails
    return { 
      appHtml: `<div class="min-h-screen flex items-center justify-center"><h1>Loading...</h1></div>`, 
      headTags: '' 
    };
  }
}
