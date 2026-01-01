# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

ABOUT PROJECT

The entire UI is data-driven—the nodes and their relationships are generated from a JSON file. If you update the JSON, the map updates automatically. I used React 19 with Vite for a fast development setup and Tailwind CSS for the styling.

Key Features

Dynamic Rendering: Everything flows from mindmapData.json.

Interactivity: You can click nodes to expand/collapse branches and hover over them to see a quick summary tooltip.

Live Editing: I added a sidebar that lets you edit node details or add new sub-nodes on the fly.

Export: There is a download button to save the current state of your map as a JSON file.
