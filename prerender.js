import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { dirname } from "path";

// Import SEO config
import { seoConfig } from "./src/seo.config.ts";

async function generatePageHTML(route, seoData) {
  const { title, description } = seoData;
  
  try {
    // Import the built server bundle
    const { render } = await import("./dist/server/entry-server.js");
    
    // Render the React app with StaticRouter for the specific route
    const { appHtml, headTags } = render(route);
    
    // Read the template
    let template;
    if (existsSync("./dist/index.html")) {
      template = readFileSync("./dist/index.html", "utf-8");
    } else {
      template = readFileSync("./index.html", "utf-8");
    }
    
    // Replace placeholders with real content
    const html = template
      .replace("<!--app-html-->", appHtml)
      .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
      .replace(/<meta name="description" content=".*?"\/>/, `<meta name="description" content="${description}" />`)
      .replace("</head>", `${headTags}\n</head>`);
    
    return html;
    
  } catch (error) {
    console.error(`Error rendering route ${route}:`, error.message);
    throw error;
  }
}

async function prerender() {
  console.log("🚀 Starting clean SSG prerendering...");

  try {
    // Ensure dist directory exists
    if (!existsSync("./dist")) {
      mkdirSync("./dist", { recursive: true });
    }
    
    // Build routes from seo.config.ts exactly
    const routes = Object.keys(seoConfig);
    console.log(`📄 Found ${routes.length} routes to prerender from seo.config.ts`);
    
    let prerenderedCount = 0;
    
    for (const route of routes) {
      try {
        const seoData = seoConfig[route];
        
        // Generate HTML for this page using clean SSR
        const html = await generatePageHTML(route, seoData);
        
        // Determine output path - use folder structure with index.html
        const filePath = route === '/' ? 'dist/index.html' : `dist${route}/index.html`;
        
        // Create directory if needed
        const dirPath = dirname(filePath);
        if (!existsSync(dirPath)) {
          mkdirSync(dirPath, { recursive: true });
        }
        
        // Write the HTML file
        writeFileSync(filePath, html);
        prerenderedCount++;
        
        console.log(`✅ Prerendered: ${route} → ${filePath}`);
        
      } catch (error) {
        console.error(`❌ Failed to prerender ${route}:`, error.message);
      }
    }
    
    console.log(`\n🎉 Prerendering completed successfully!`);
    console.log(`📊 Prerendered ${prerenderedCount} pages`);
    console.log(`🔍 pre-rendered: dist/index.html and ${prerenderedCount - 1} other pages`);
    
  } catch (error) {
    console.error("❌ Prerendering failed:", error.message);
    console.error("Stack trace:", error.stack);
  }
}

prerender();
