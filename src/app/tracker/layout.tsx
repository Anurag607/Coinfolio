import Head from "next/head";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content={`A Notion Like Block Editor.`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href={`${process.env.NEXT_PUBLIC_BASE_PATH}/cf_logo.svg`}
        />
        <link
          rel="shortcut icon"
          href={`${process.env.NEXT_PUBLIC_BASE_PATH}/cf_logo.svg`}
        />
        <link
          rel="apple-touch-icon"
          href={`${process.env.NEXT_PUBLIC_BASE_PATH}/cf_logo.svg`}
        />
        <title>{"CoWrite"}</title>
      </Head>
      <main className={"w-full h-full relative"}>{children}</main>
    </>
  );
}
