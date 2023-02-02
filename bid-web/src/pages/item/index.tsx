import DefaultLayout from "../../layouts/default"

const Item  =  () => {
  return (
    <DefaultLayout>
      <div className="container h-100">
        <div className="card my-5 h-75 border-0">
          <div className="row g-0">
            <div className="col-md-5 col-sm-12">
              <div className="p-md-3">
                <img src="https://via.placeholder.com/250.png/09f/fff" className="w-100 d-block rounded" alt="..." />
              </div>
            </div>
            <div className="col-md-7 col-sm-12">
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text mb-4">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <div className="row align-items-center">
                  <div className="col-md-5 mb-3">
                    <p className="card-text fw-bold"><span className="fw-bolder">Last Bid: </span> 30$</p>
                  </div> 
                  <div className="col-md-5 mb-5">
                    <div className="input-group float-end">
                      <span className="input-group-text">$</span>
                      <input type="text" className="form-control" aria-label="Text input" value={31}/>
                      <button type="button" className="btn btn-outline-secondary">Place a bid</button>
                    </div>
                  </div>
                  <div className="col-md-5 mb-5">
                    <div className="form-check form-switch float-start">
                      <input className="form-check-input" type="checkbox" role="switch" />
                      <label className="form-check-label">Activate auto bid</label>
                    </div>
                  </div>
                  <div className="col-md-5 mb-5">
                    <p><small>3 days 5h: 30m: 3s </small></p>
                    <div className="progress" role="progressbar">
                      <div className="progress-bar bg-success" style={{width: "25%"}}></div>
                    </div>
                  </div>
                  <div className="col-md-5 offset-md-5 mb-3">
                    <button className="btn btn-dark float-end">Leave</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default Item
