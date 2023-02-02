import NavBar from "../components/navbar"

const DefaultLayout = ({children}: { children: JSX.Element | JSX.Element[]}) => {
  return (
    <div className="default">
      <NavBar />
      {children}
    </div>
  )
}

export default DefaultLayout