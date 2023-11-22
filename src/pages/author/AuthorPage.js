import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { keepPreviousData, useQuery } from "react-query";
import AuthorAPI from "../../apis/AuthorAPI";
import BootstrapTable from "react-bootstrap-table-next";
import ReactJSPagination from "react-js-pagination";
import CaptionElement from "../../components/common/CaptionElement";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { useRef, useState} from "react";
import { AUTHOR_ROUTE, PAGE_RANGE_DISPLAY } from "../../utilis/utiliCommon";

const AuthorPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page');
  const authorNameSearch = searchParams.get('author_name');
  const orderBySearch = searchParams.get('order_by');
  const orderTypeSearch = searchParams.get('order_type');
  const [params, setParams] = useState({
    page: currentPage ? currentPage : 1,
    author_name: authorNameSearch,
    order_by: orderBySearch ? orderBySearch :'id',
    order_type: orderTypeSearch ? orderTypeSearch : 'ASC'
  });

  const handleChangePage = (value) => {
    const paramsUpdate = {...params};
    paramsUpdate.page = value;
    paramsUpdate.author_name = authorSearch.current.value;
    setParams(paramsUpdate)
    navigate({
      pathname: `${AUTHOR_ROUTE}`,
      search: `?${createSearchParams(paramsUpdate)}`
    })
  }
  const authorSearch = useRef();
  const onSearch = (order_by = '', order_type = '') => {
    const paramsUpdate = beforeSearch(order_by, order_type);
    search(paramsUpdate);
  }
  function search (params){
      navigate({
      pathname: `${AUTHOR_ROUTE}`,
      search: `?${createSearchParams(params)}`
    })
  }
  function beforeSearch (order_by = '', order_type = '') {
    let paramsUpdate = {...params};
    if(order_by && order_by !== paramsUpdate.order_by) {
      paramsUpdate.order_by = order_by;
    } 
    if(order_type && order_type !== paramsUpdate.order_type) {
      paramsUpdate.order_type = order_type;
    } 
    paramsUpdate.author_name = authorSearch.current.value;
    setParams(paramsUpdate);
    return paramsUpdate
  }
  const columns = [
    {
      dataField: "author_name",
      text: "Author name",
      sort: true,
      onSort: (field, order) => {
        onSearch(field, order);
      }
    },
    {
      dataField: "place_of_origin",
      text: "Place of origin",
    },
    {
      dataField: "info",
      text: "Info",
    },
  ];
  const defaultSorted = [
    {
      dataField: "id",
      order: "asc",
    },
  ];

  const tableRowEvents = {
    onDoubleClick: (e, row, rowIndex) => {
      const { id } = row;
      if (id) {
        navigate(`${AUTHOR_ROUTE}/${id}`);
      }
    },
  };

  const queryOptions = {
    queryKey: ["authors", params],
    staleTime: Infinity,
    queryFn: () => AuthorAPI.index(params)
};
  const {
    isLoading,
    isError,
    data: result,
    error,
  } = useQuery(queryOptions);
  
  return (
    <div className="author_page container mt-4">
      <CaptionElement caption="List author"/>
      <div className="my-4">
        <Row className="justify-content-between">
          <Col sm={4}>
            <InputGroup>
              <Form.Control
                className="mx-3"
                placeholder="Search author name"
                aria-label="author_name"
                aria-describedby="Search author name"
                ref={authorSearch}
              />
              <Button className=" pl-7" 
              variant="info" type="submit"
              onClick={() => onSearch()}
              >
                Search
              </Button>{" "}
            </InputGroup>
          </Col>

          <Col sm={2}>
            <Button href={`${AUTHOR_ROUTE}/add`}>Add author</Button>
          </Col>
        </Row>
      </div>
      {result && (
        <>
          <div className="mt-4">
            <BootstrapTable
              keyField="id"
              bootstrap4 data={result.data}
              columns={columns}
              defaultSorted={defaultSorted}
              striped hover condensed
              noDataIndication="Table is Empty"
              rowEvents={tableRowEvents}
            />
          </div>
          <div className="d-flex justify-content-center">
            <ReactJSPagination
                activePage={result.current_page}
                itemsCountPerPage={result.per_page}
                totalItemsCount={result.total}
                pageRangeDisplayed={PAGE_RANGE_DISPLAY}
                onChange={handleChangePage}
              />
          </div>
        </>
      )}
    </div>
  );
};

export default AuthorPage;
