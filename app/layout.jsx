import "@styles/globals.css";

export const metadata = {
  title: "Promptilia",
  description: "An AI Powered Prompt Engine.",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
