import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Paper,
  Table as TableMUI,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TableHead
} from "@material-ui/core";

import AppInput from "../../common/input/Input"

import { omniSearch } from "../../../helpers/searchUtility";

import "./Table.css";
import AppButton from "../button/Button";


const SORT_DIRECTION = {
  ASCENDING: "ASCENDING",
  DECENDING: "DECENDING",
};


export default function Table({
  headers = [],
  rows = [],
  onRowClick,
  onRowHover,
  tableHeight = "80vh",
  rowActions = [],
  searchable = false,
}) {
  /**
   * This is a generic table component
   *
   * To use it, you need to pass two required parameters
   * @param {Required} headers : An array of objects each containing a name of the headers of the table
   *                  and the corresponding key. {name: "Header display", key: "keyInTheObject"}
   *
   * There is a method in the tableHelper.js file to create a table header object for you
   * by just passing the display name of the header and the name of the field in the object
   *
   * @param {Required} rows: The raw list of data, only the objects selected from it in the @param headers
   *              will be displayed. Can have extra objects.
   *
   * @param onRowClick: Action to happen when the row is clicked.
   * 
   * @param tableHeight: A height to for the table, defaults to 80% of the user's view.
   *
   * @param searchable: A boolean value that defaults to false, it indicates whether the table will have a search bar.
   * 
   * @param rowActions: An  array that contains the list of actions that can be carried on the table items. (menuHelper.js)
   */

  const [_rows, _setRows] = useState([...rows]);
  const [_searchPhrase, _setSearchPhrase] = useState("");
  const [_lastSort, _setlastSort] = useState({
    key: "",
    sort: SORT_DIRECTION.ASCENDING,
  });


  // Table functions
  const handleSort = (key) => {
    // Sort Ascendingly if user is sorting by a new key or if the user has already sorted by this key descendingly
    if (
      key !== _lastSort.key ||
      (key === _lastSort.key && _lastSort.sort === SORT_DIRECTION.DECENDING)
    ) {
      _setRows(_sort(key, _rows, SORT_DIRECTION.ASCENDING));
      _setlastSort({ key: key, sort: SORT_DIRECTION.ASCENDING });
      // In any other condition, sort descendingly
    } else {
      _setRows(_sort(key, _rows, SORT_DIRECTION.DECENDING));
      _setlastSort({ key: key, sort: SORT_DIRECTION.DECENDING });
    }
  };

  const _sort = useCallback((key, _rows, sortDirection) => {
    console.log(rowActions);
    if (sortDirection === SORT_DIRECTION.ASCENDING)
      return [..._rows].sort((a, b) => (a[key] > b[key] ? 1 : -1));
    else
      return [..._rows].sort((a, b) => (a[key] > b[key] ? -1 : 1));
  }, []);

  // Prevents recomputing of rows unless the rows or the search phrase change
  const handleTableSearch = useCallback(() => {
    let searchPhrase = _searchPhrase.trim();
    _setRows(omniSearch(rows, searchPhrase));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_searchPhrase, rows]);

  // Search whenever the search phrase is changed
  useEffect(() => {
    handleTableSearch();
  }, [_searchPhrase, handleTableSearch]);

  return (
    <>
      <div className="table-controls-container">
        {
          searchable &&
          <div className="table-search-bar-container">
            <AppInput
              type="text"
              inputClassName="table-search-bar"
              InputProps={{ disableUnderline: true }}
              value={_searchPhrase}
              onChange={e => _setSearchPhrase(e.target.value)}
            />
          </div>
        }
      </div>
      <Paper >
        <TableContainer style={{ height: tableHeight }}>
          <TableMUI stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow className="head">
                {
                  // Leaves an empty header in case there was a context menu for the table
                  rowActions &&

                  rowActions.map(action => (
                    < TableCell key="menu" className="header-cell">
                      <div className="header-cell-content" />
                    </TableCell>
                  ))
                }
                {headers.map((header) => (
                  <TableCell
                    key={header.key}
                    className="header-cell"
                    onClick={() => {
                      handleSort(header.key);
                    }}
                  >
                    <div className="header-cell-content">{header.name}</div>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {_rows.map((row) => (
                <TableRow
                  data-tip={onRowHover && onRowHover}
                  key={row.name}
                  onClick={onRowClick ? () => onRowClick(row) : () => { }}
                  className="row"
                  style={onRowClick && { cursor: "pointer" }}
                >
                  {rowActions.map(action => (
                    <TableCell key={Math.random()} align="center">
                      <AppButton onClick={e => action.action(row.id)} text={action.name} />
                    </TableCell>
                  ))}

                  {headers.map((header) => (
                    <TableCell key={Math.random()} align="center">
                      {row[header.key]} {header.suffix && header.suffix}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </TableMUI>
        </TableContainer>
      </Paper>
    </>
  );
}

Table.propTypes = {
  headers: PropTypes.array,
  rows: PropTypes.array,
  onRowClick: PropTypes.func,
  onRowHover: PropTypes.func,
  searchable: PropTypes.bool
};

