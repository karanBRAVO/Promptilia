import "@styles/globals.css";
import Nav from "@app/ui/Nav";
import AuthProvider from "./ui/AuthProvider";
import { getServerSession } from "next-auth";

export const metadata = {
  title: "Promptilia",
  description: "An AI Powered Prompt Engine.",
};

const RootLayout = async ({ children }) => {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body>
        <AuthProvider session={session}>
          <Nav />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
