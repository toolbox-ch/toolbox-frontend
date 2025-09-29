import { readFileSync, writeFileSync, existsSync } from "fs";
import { readFileSync as readFile } from "fs";

async function prerender() {
  console.log("🚀 Starting prerendering...");

  try {
    // Check if dist/index.html exists, if not create it from the template
    let template;
    if (existsSync("./dist/index.html")) {
      template = readFileSync("./dist/index.html", "utf-8");
    } else {
      // Read from the source index.html as fallback
      template = readFileSync("./index.html", "utf-8");
    }
    
    // Create prerendered HTML for the home route
    const homeHtml = `
      <div class="min-h-screen flex flex-col">
        <div class="bg-card border-b sticky top-0 z-50 backdrop-blur-sm bg-card/95">
          <div class="container mx-auto px-4 py-4">
            <div class="flex items-center justify-between gap-4">
              <div class="text-xl font-bold text-primary cursor-pointer hover:text-primary-hover transition-colors">
                Toolbox24
              </div>
            </div>
          </div>
        </div>
        <main class="flex-1">
          <div class="min-h-screen">
            <section class="py-16 md:py-24">
              <div class="container mx-auto px-4 text-center">
                <div class="max-w-3xl mx-auto">
                  <h1 class="text-4xl md:text-5xl font-bold text-foreground mb-6">
                    Toolbox24
                  </h1>
                  <p class="text-xl md:text-2xl text-muted-foreground mb-8">
                    Kostenlose Online-Tools für PDFs, Bilder und Vorlagen
                  </p>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    `;
    
    // Replace the placeholder with the prerendered HTML
    const html = template.replace("<!--app-html-->", homeHtml);
    
    // Ensure dist directory exists
    if (!existsSync("./dist")) {
      const { mkdirSync } = await import("fs");
      mkdirSync("./dist", { recursive: true });
    }
    
    // Write the updated index.html
    writeFileSync("./dist/index.html", html);
    
    console.log("✅ Prerendering completed successfully!");
    console.log("📄 Home page prerendered and saved to dist/index.html");
    console.log("📁 File size:", (html.length / 1024).toFixed(2), "KB");
  } catch (error) {
    console.error("❌ Prerendering failed:", error.message);
    console.error("Stack trace:", error.stack);
    
    // Create a fallback index.html if prerendering fails
    const fallbackHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Toolbox24 - Kostenlose Tools für PDF, Bilder & Vorlagen</title>
    <meta name="description" content="Kostenlose Online-Tools für PDF-Bearbeitung, Bildkonvertierung und professionelle Vorlagen. Direkt im Browser, ohne Upload - sicher und effizient." />
  </head>
  <body>
    <div id="root"><!--app-html--></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;
    
    writeFileSync("./dist/index.html", fallbackHtml);
    console.log("📄 Fallback index.html created");
  }
}

prerender();
