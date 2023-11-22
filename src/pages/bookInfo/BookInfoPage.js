import { useRef, useState } from "react";
import { useQuery } from "react-query";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import BookInfoAPI from "../../apis/BookInfoAPI";
import CaptionElement from "../../components/common/CaptionElement";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import InputGroup from "react-bootstrap/esm/InputGroup";
import Button from "react-bootstrap/esm/Button";
import BootstrapTable from "react-bootstrap-table-next";
import { BOOK_INFO_ROUTE, PAGE_RANGE_DISPLAY } from "../../utilis/utiliCommon";
import ReactJSPagination from "react-js-pagination";
import Form from "react-bootstrap/Form";
const BookInfoPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page');
  const authorNameParamSearch = searchParams.get('author_name');
  const bookNameParamSearch = searchParams.get('book_name');
  const orderBySearch = searchParams.get('order_by');
  const orderTypeSearch = searchParams.get('order_type');
  const [params, setParams] = useState({
    page: currentPage ? currentPage : 1,
    author_name: authorNameParamSearch,
    book_name: bookNameParamSearch,
    order_by: orderBySearch ? orderBySearch : 'id',
    order_type: orderTypeSearch ? orderTypeSearch : 'ASC'
  });

  const authorSearch = useRef();
  const bookNameSearch = useRef();

  const onSearch = (order_by = '', order_type = '') => {
    const paramsUpdate = beforeSearch(order_by, order_type);
    search(paramsUpdate);
  }
  function search(params) {
    navigate({
      pathname: `${BOOK_INFO_ROUTE}`,
      search: `?${createSearchParams(params)}`
    })
  }

  function beforeSearch(order_by = '', order_type = '') {
    let paramsUpdate = { ...params };
    if (order_by && order_by !== paramsUpdate.order_by) {
      paramsUpdate.order_by = order_by;
    }
    if (order_type && order_type !== paramsUpdate.order_type) {
      paramsUpdate.order_type = order_type;
    }
    paramsUpdate.author_name = authorSearch.current.value;
    paramsUpdate.book_name = bookNameSearch.current.value;
    setParams(paramsUpdate);
    return paramsUpdate
  }
  const handleChangePage = (value) => {
    const paramsUpdate = { ...params };
    paramsUpdate.page = value;
    paramsUpdate.author_name = authorSearch.current.value;
    paramsUpdate.book_name = bookNameSearch.current.value;
    setParams(paramsUpdate)
    navigate({
      pathname: `${BOOK_INFO_ROUTE}`,
      search: `?${createSearchParams(paramsUpdate)}`
    })
  }

  const columns = [
    {
      dataField: "book_name",
      text: "Book name",
      sort: true,
      onSort: (field, order) => {
        console.log('field', field);
        console.log('order', order);
        onSearch(field, order);
      }
    },
    {
      dataField: "author_name",
      text: "Author name",
      sort: true,
      onSort: (field, order) => {
        onSearch(field, order);
      }
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
        navigate(`${BOOK_INFO_ROUTE}/${id}`);
      }
    },
  };
  const queryOptions = {
    queryKey: ["bookInfo", params],
    staleTime: Infinity,
    queryFn: () => BookInfoAPI.index(params),
  };
  const {
    isLoading,
    isError,
    data: result,
    error,
  } = useQuery(queryOptions);


  return (<div className="book_info_page container mt-4">
    <CaptionElement caption="Book Info" />
    <div className="my-4">
      <Row className="justify-content-between">
        <Col sm={6}>
          <InputGroup>
            <Form.Control
              className="mx-3"
              placeholder="Search book name"
              aria-label="book_name"
              aria-describedby="Search book name"
              ref={bookNameSearch}
            />
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
          <Button href={`${BOOK_INFO_ROUTE}/add`}>Add book info</Button>
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
  </div>);
}

export default BookInfoPage;