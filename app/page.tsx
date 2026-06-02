import BasicCard from "@/components/shared/card/basic-card"
import Header from "@/components/shared/header"
import Sidebar from "@/components/shared/sidebar"

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-grid">
      <Header />
      <main>
        <Sidebar />
        <div className="p-4 lg:ml-(--sidebar-width)">
          <div className="flex flex-wrap items-start gap-4">
            <BasicCard
              title="Main Content"
              description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus amet ullam molestiae quis ipsum vitae tempora, commodi error! Odio assumenda eaque laboriosam est exercitationem explicabo debitis sequi, mollitia corporis cum!"
            />
            <BasicCard
              title="Main Content"
              description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. "
            />
            <BasicCard
              title="Main Content"
              description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. "
            />
            <BasicCard
              title="Main Content"
              description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus amet ullam molestiae quis ipsum vitae tempora, commodi error! Odio assumenda eaque laboriosam est exercitationem explicabo debitis sequi, mollitia corporis cum!"
            />
          </div>
          <hr className="my-10" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <BasicCard
              title="Main Content"
              description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus amet ullam molestiae quis ipsum vitae tempora, commodi error! Odio assumenda eaque laboriosam est exercitationem explicabo debitis sequi, mollitia corporis cum!"
            />
            <BasicCard
              title="Main Content"
              description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. "
            />
            <BasicCard
              title="Main Content"
              description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. "
            />
            <BasicCard
              title="Main Content"
              description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus amet ullam molestiae quis ipsum vitae tempora, commodi error! Odio assumenda eaque laboriosam est exercitationem explicabo debitis sequi, mollitia corporis cum!"
            />
          </div>
        </div>
      </main>
    </div>
  )
}
