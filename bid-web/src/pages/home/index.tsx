import Card from "../../components/card";
import DefaultLayout from "../../layouts/default";

const Home  = () =>{
  return(
    <DefaultLayout>
      <section className="row align-items-center mb-md-5">
        <div className="col py-5 px-md-5">
          <div className="input-group mb-3 px-md-5 w-75 mx-auto">
            <input type="text" className="form-control" aria-label="Text input" />
            <button type="button" className="btn btn-outline-secondary">Search</button>
          </div>
        </div>
      </section>
      <section className="row align-items-center mb-5 p-5">
        {[1,3,4,5,6,7].map(e => (
          <div key={e} className="col-md-3 col-sm-10 mb-5">
            <Card key={e}></Card>
          </div>
        ))}
      </section>
    </DefaultLayout>
  );
}

export default Home