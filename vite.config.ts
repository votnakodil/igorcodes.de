import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
    },
    build: {
        rolldownOptions: {
            output: {
                codeSplitting: {
                    groups: [
                        {
                            name: "react-vendor",
                            test: /node_modules[\\/](?:react|react-dom|scheduler)[\\/]/,
                            priority: 30,
                        },
                        {
                            name: "motion-vendor",
                            test: /node_modules[\\/](?:motion|framer-motion|motion-dom|motion-utils)[\\/]/,
                            priority: 20,
                        },
                        {
                            name: "liquid-gooey",
                            test: /node_modules[\\/]liquid-gooey[\\/]/,
                            priority: 20,
                        },
                        {
                            name: "symbols-react",
                            test: /node_modules[\\/]symbols-react[\\/]/,
                            priority: 20,
                        },
                    ],
                },
            },
        },
    },
});
