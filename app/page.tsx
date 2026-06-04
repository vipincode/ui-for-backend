export default function Home() {
  return (
    <main>
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
      <div className="@container">
        <div className="flex flex-row @sm:@max-md:flex-col">
          <div className="p-4 flex-1 border rounded-lg shadow-md bg-green-300">
            Card 1
          </div>
          <div className="p-4 flex-1 border rounded-lg shadow-md bg-green-300">
            Card 2
          </div>
          <div className="p-4 flex-1 border rounded-lg shadow-md bg-green-300">
            Card 3
          </div>
          <div className="p-4 flex-1 border rounded-lg shadow-md bg-green-300">
            Card 4
          </div>
        </div>
      </div>

      <div className="@container-size h-[400px] border">
        <div className="h-[50cqb] bg-red-400"></div>
      </div>
    </main>
  );
}
