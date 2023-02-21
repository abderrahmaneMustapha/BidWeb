import {
  useEffect,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { PAGINATION_ITEMS } from "../../../common/confing";
import BidTable from "../../../components/bidTable";
import {
  useListBidMutation,
} from "../../../redux/queries";

const pageSize = parseInt(PAGINATION_ITEMS || "10");

const BidHistory = () => {
  const [listBid, { isError, data }] = useListBidMutation();
  const [currentItems, setCurrentItems] = useState<number>(0);
  const { name } = useParams()
  useEffect(() => {
        listBid({
          limit: pageSize,
          skip: currentItems,
          name,
        })
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentItems]);

  const goNext = () => {
      if (!data || isError) return;
      if (data?.data.count <= pageSize) return;
      if (currentItems + pageSize >= data?.data.count) return;
      setCurrentItems(currentItems + pageSize);
  };

  const goPrev = () => {
      if (!data || isError) return;
      if (currentItems === 0 || data?.data.count <= pageSize) return;
      setCurrentItems(currentItems - pageSize);
  };

  const displayCurrentItems = () => {
      if (data?.data.count < currentItems + pageSize) {
          return data?.data.count;
      }

      return currentItems + pageSize;
  };

  return (
          <div className="container p-md-5">
              <header className="mb-5 mt-3 d-flex justify-content-between">
                  <h2>{name} bids history</h2>
              </header>
              <section className="my-2 d-flex align-items-start">
                  <div className="col-md-4 col-sm-12 mb-4">
                      <button
                          className="btn btn-success btn-sm"
                          onClick={goPrev}
                      >
                          Previous
                      </button>
                      <span className="m-2">
                          <strong>
                              {displayCurrentItems()} /{" "}
                              {data?.data.count || 0}
                          </strong>
                      </span>
                      <button
                          className="btn btn-success btn-sm"
                          onClick={goNext}
                      >
                          Next
                      </button>
                  </div>
              </section>
              <BidTable
                  data={data?.data.data || []}
              ></BidTable>
          </div>
  );
};

export default BidHistory;
