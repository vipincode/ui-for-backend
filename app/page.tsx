import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-gray-200 min-h-screen">
      <header className="flex justify-between items-center border-b border-gray-800 h-(--header-height) px-5">
        <Link href="/">Logo</Link>

        <div className="space-x-4">
          <Link href="/components">Components</Link>
          <Link href="/components">Components</Link>
          <Link href="/components">Components</Link>
        </div>
      </header>
      <div className="fixed left-0 w-(--sidebar-width) bg-gray-600 h-[calc(100vh-var(--header-height))] flex-col pb-5 hidden lg:flex">
        <div className="flex flex-col space-y-4 p-5 flex-1">
          <Link href="/components">Components</Link>
          <Link href="/components">Components</Link>
          <Link href="/components">Components</Link>
        </div>

        <div>
          <Button variant={"outline"} className="w-full">
            Logout
          </Button>
        </div>
      </div>

      {/* content */}
      <div className="lg:ml-(--sidebar-width) p-5">
        <div className="grid font-mono grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-white shadow-2xl p-6">
            <h3>Heading</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
              excepturi voluptate veniam! Maxime doloremque amet quos numquam
              libero nemo rerum, neque, suscipit, officia ex hic dolore mollitia
              sunt natus excepturi.
            </p>
          </div>
          <div className="bg-white shadow-2xl p-6">
            <h3>Heading</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
              excepturi voluptate veniam! Maxime doloremque amet quos numquam
              libero nemo rerum, neque, suscipit, officia ex hic dolore mollitia
              sunt natus excepturi.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            <div className="bg-white shadow-2xl p-4  flex gap-4">
              <div className="h-16 w-16 rounded-full bg-amber-300" />
              <article className="flex-1">
                <h3>Heading</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aliquid excepturi voluptate veniam! Maxime doloremque amet
                  quos numquam libero nemo rerum, neque, suscipit, officia ex
                  hic dolore mollitia sunt natus excepturi.
                </p>
              </article>
            </div>
            <div className="bg-white shadow-2xl p-4  flex gap-4">
              <div className="h-16 w-16 rounded-full bg-amber-300" />
              <article className="flex-1">
                <h3>Heading</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aliquid excepturi voluptate veniam! Maxime doloremque amet
                  quos numquam libero nemo rerum, neque, suscipit, officia ex
                  hic dolore mollitia sunt natus excepturi.
                </p>
              </article>
            </div>
            <div className="bg-white shadow-2xl p-4  flex gap-4">
              <div className="h-16 w-16 rounded-full bg-amber-300" />
              <article className="flex-1">
                <h3>Heading</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aliquid excepturi voluptate veniam! Maxime doloremque amet
                  quos numquam libero nemo rerum, neque, suscipit, officia ex
                  hic dolore mollitia sunt natus excepturi.
                </p>
              </article>
            </div>
            <div className="bg-white shadow-2xl p-4  flex gap-4">
              <div className="h-16 w-16 rounded-full bg-amber-300" />
              <article className="flex-1">
                <h3>Heading</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aliquid excepturi voluptate veniam! Maxime doloremque amet
                  quos numquam libero nemo rerum, neque, suscipit, officia ex
                  hic dolore mollitia sunt natus excepturi.
                </p>
              </article>
            </div>
          </div>
        </div>
      </div>

      <div className="@container w-full max-w-[36rem] mx-auto">
        <div className="grid  @lg:grid-cols-3 @xl:grid-cols-4">
          <div className="p-4 border rounded-lg shadow-md bg-amber-300">
            Card 1
          </div>
          <div className="p-4 border rounded-lg shadow-md bg-amber-300">
            Card 2
          </div>
          <div className="p-4 border rounded-lg shadow-md bg-amber-300">
            Card 3
          </div>
          <div className="p-4 border rounded-lg shadow-md bg-amber-300">
            Card 4
          </div>
          <div className="p-4 border rounded-lg shadow-md bg-amber-300">
            Card 5
          </div>
        </div>
      </div>
    </main>
  );
}
