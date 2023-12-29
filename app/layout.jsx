import "@styles/globals.css";
import Nav from "@app/ui/Nav";

export const metadata = {
  title: "Promptilia",
  description: "An AI Powered Prompt Engine.",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
