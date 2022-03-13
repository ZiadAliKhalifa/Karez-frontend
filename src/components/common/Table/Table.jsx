import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Paper,
  Table as TableMUI,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TableHead,
  TextField
} from "@material-ui/core";
import DateAdapter from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { ClickAwayListener, Fade, MenuItem, MenuList, Popper } from "@mui/material";
import MoreVertOutlined from "@mui/icons-material/MoreVertOutlined";

import AppInput from "../../common/input/Input"

import { omniSearch } from "../../../helpers/searchUtility";

import "./Table.css";


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
  datepicker = false
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
   * @param datepicker: A boolean value that defaults to false, it indicates whether the table will have a date filter.
   * 
   * @param rowActions: An  array that contains the list of actions that can be carried on the table items. (menuHelper.js)
   */

  const [_rows, _setRows] = useState([...rows]);
  const [_searchPhrase, _setSearchPhrase] = useState("");
  const [_date, _setDate] = useState();
  const [_lastSort, _setlastSort] = useState({
    key: "",
    sort: SORT_DIRECTION.ASCENDING,
  });


  // Context menu related fields
  const [_openRow, _setOpenRow] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);


  // Context menu functions
  const handleClose = (e) => {
    _setOpenRow(0);
    e.stopPropagation();
  };

  const handleContextMenu = (e, row) => {
    e.stopPropagation();
    const { clientX, clientY } = e;
    _setOpenRow(row.id);
    const virtualElement = {
      getBoundingClientRect: () => ({
        width: 0,
        height: 0,
        top: clientY,
        right: clientX,
        bottom: clientY,
        left: clientX
      })
    };
    setAnchorEl(virtualElement);
  };

  // Carries out the function passed to the menu action
  const handleRowAction = (event, func, id) => {
    // Closes the menu before running the function passed to the menu action
    handleClose(event);
    func(id);
  }


  // Closes the menu if the user scrolls outside the table
  useEffect(() => {
    window.addEventListener("scroll", (e) => handleClose(e));

    return () => { // return a cleanup function to unregister our function since its gonna run multiple times
      window.removeEventListener("scroll", (e) => handleClose(e));
    };
  }, []);


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
        {
          datepicker &&
          <div className="date-picker-container">
            <LocalizationProvider dateAdapter={DateAdapter}>
              <DesktopDatePicker
                label="التاريخ"
                inputFormat="dd/MM/yyyy"
                value={_date}
                disableFuture={true}
                onChange={value => _setDate(value)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        }
      </div>
      <Paper >
        <TableContainer style={{ height: tableHeight }}>
          <TableMUI stickyHeader aria-label="sticky table" onScroll={handleClose}>
            <TableHead>
              <TableRow className="head">

                {
                  // Leaves an empty header in case there was a context menu for the table
                  rowActions &&
                  <TableCell
                    key="menu"
                    className="header-cell"
                  >
                    <div className="header-cell-content" />
                  </TableCell>
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
                  {
                    // Context menu
                    rowActions &&
                    <TableCell key="menu">
                      <MoreVertOutlined onClick={e => handleContextMenu(e, row)} />
                      <Popper
                        id={row.id}
                        open={_openRow != 0}
                        anchorEl={anchorEl}
                        transition
                        placement="bottom-start"
                      >
                        {({ TransitionProps }) => (
                          <ClickAwayListener onClickAway={handleClose}>
                            <Fade {...TransitionProps}>
                              <MenuList key={row.id}>
                                {
                                  rowActions.map(action => (
                                    <MenuItem
                                      key={row.id + action.name}
                                      onClick={e => {
                                        let targetedRow = rows.find(row => row.id === _openRow)
                                        handleRowAction(e, action.func, targetedRow)
                                      }}
                                    >
                                      {action.icon}{action.name}
                                    </MenuItem>
                                  ))
                                }
                              </MenuList>
                            </Fade>
                          </ClickAwayListener>
                        )}
                      </Popper>
                    </TableCell>
                  }
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

