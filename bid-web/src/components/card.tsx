import { useNavigate } from "react-router-dom"

const Card  = () => {
  const navigate = useNavigate()
  return (
  <div className="card">
    <img src="https://via.placeholder.com/250.png/09f/fff" className="card-img-top" alt="..." />
    <div className="card-body">
      <h5 className="card-title">Card title</h5>
      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <p className="card-text fw-bold"><span className="fw-bolder">Last Bid: </span> 30$</p>
      <button className="btn btn-primary" onClick={() => navigate(`bid/${1}/${'car'}`)}>Go somewhere</button>
    </div>
  </div>
  )
}

export default Card