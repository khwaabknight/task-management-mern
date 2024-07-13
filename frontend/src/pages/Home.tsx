import BgProvider from "../components/Providers/BgProvider"
import UserInfo from "../components/Home/UserInfo"
import SearchNFilter from "../components/Home/SearchNFilter"
import TaskList from "../components/Home/TaskList"
import AddTaskButton from "../components/Home/AddTaskButton"

function Home() {

  return (
    <BgProvider imgSrc="/images/task-bg.jpg">
      <div className="h-[95vh] flex flex-col gap-3">
        <UserInfo/>
        <SearchNFilter />
        <TaskList />
        <AddTaskButton/>
      </div>
    </BgProvider>
  )
}

export default Home