import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";

export function render(url: string) {
  try {
    // Render the React app with StaticRouter for the specific route
    const appHtml = renderToString(
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
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
