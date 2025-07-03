/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
**  Copyright (c) 2008 ,2017, Oracle and/or its affiliates.
**  All rights reserved.
**  
**  No part of this work may be reproduced, stored in a retrieval system, 
**  adopted or transmitted in any form or by any means, electronic, mechanical, photographic, 
**  graphic, optic recording or otherwise, translated in any language or computer language, 
**  without the prior written permission of Oracle and/or its affiliates.
**  
**  Oracle Financial Services Software Limited.
**  Oracle Park, Off Western Express Highway,
**  Goregaon (East),
**  Mumbai - 400 063,
**  India.
**  
**  Written by         : 
**  Date of creation   : 
**  File Name          : CSVUtility.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
****************************************************************************************************************************/
(function (window, undefined) {'use strict';

    ///////////////////////
    // Constants & Helpers
    ///////////////////////

    var Char = {
        COMMA           : ',',
        RETURN          : '\r',
        NEWLINE         : '\n',
        SEMICOLON       : ';',
        TAB             : '\t'
    };    
    var DataType = {
        CURRENCY    : 'CURRENCY',
        DATETIME    : 'DATETIME',
        FORMULA     : 'FORMULA',
        LOGICAL     : 'LOGICAL',
        NUMBER      : 'NUMBER',
        TEXT        : 'TEXT'
    };
    var Exception = {    
        CELL_NOT_FOUND              : 'CELL_NOT_FOUND',
        COLUMN_NOT_FOUND            : 'COLUMN_NOT_FOUND',
        ROW_NOT_FOUND               : 'ROW_NOT_FOUND',
        ERROR_READING_FILE          : 'ERROR_READING_FILE',
        ERROR_WRITING_FILE          : 'ERROR_WRITING_FILE',
        FILE_NOT_FOUND              : 'FILE_NOT_FOUND',
        FILE_EXTENSION_MISMATCH     : 'FILE_EXTENSION_MISMATCH',
        FILETYPE_NOT_SUPPORTED      : 'FILETYPE_NOT_SUPPORTED',
        INVALID_DOCUMENT_FORMAT     : 'INVALID_DOCUMENT_FORMAT',
        INVALID_DOCUMENT_NAMESPACE  : 'INVALID_DOCUMENT_NAMESPACE',
        MALFORMED_JSON              : 'MALFORMED_JSON',
        UNIMPLEMENTED_METHOD        : 'UNIMPLEMENTED_METHOD',
        UNKNOWN_ERROR               : 'UNKNOWN_ERROR',
        UNSUPPORTED_BROWSER         : 'UNSUPPORTED_BROWSER'
    };
    var Format = {        
        CSV     : 'csv'
    };
    var MIMEType = {
        CSV     : 'text/csv'
    };
    var Regex = {
        FILENAME    : /.*\./g,
        LINEBREAK   : /\r\n?|\n/g,
        COMMA       : /(,)(?=(?:[^"]|"[^"]*")*$)/g,
        QUOTATION   : /(^")(.*)("$)/g,
        TWO_QUOTES  : /""/g
    };
    var Utils = {
        getFiletype : function (filename) {
            return filename.replace(Regex.FILENAME, '');
        },
        isEqual     : function (str1, str2, ignoreCase) {
            return ignoreCase ? str1.toLowerCase() == str2.toLowerCase() : str1 == str2;
        },
        isSupportedBrowser: function() {
            return !![].forEach && !!window.FileReader;
        },
        overrideProperties : function (old, fresh) {
            for (var i in old) {
                if (old.hasOwnProperty(i)) {
                    old[i] = fresh.hasOwnProperty(i) ? fresh[i] : old[i];
                }
            }
            return old;
        }
    };
    
    /////////////////////////////
    // Spreadsheet Constructors
    ////////////////////////////

    var Cell = function (value, dataType) {
        var defaults = {
            value    : value || '',
            dataType : dataType || DataType.TEXT
        };
        if (typeof value == typeof {}) {
            defaults = Utils.overrideProperties(defaults, value);
        }
        this.value = defaults.value;
        this.dataType = defaults.dataType;
        this.toString = function () {
            return value.toString();
        };
    };        
    var Records = function() {};
    Records.prototype = [];
    Records.prototype.getCell = function(colNum, rowNum) {
        return this[rowNum - 1][colNum - 1];
    };
    Records.prototype.getColumn = function (colNum) {        
        var col = [];
        this.forEach(function (el, i) {
            col.push(el[colNum - 1]);
        });
        return col;
    };
    Records.prototype.getRow = function (rowNum) {
        return this[rowNum - 1];
    };    
    var Sheet = function () {
        this.records = new Records();
    };
    Sheet.prototype.getCell = function (colNum, rowNum) {
        return this.records.getCell(colNum, rowNum);
    };
    Sheet.prototype.getColumn = function (colNum) {
        return this.records.getColumn(colNum);
    };
    Sheet.prototype.getRow = function (rowNum) {
        return this.records.getRow(rowNum);
    };
    Sheet.prototype.insertRecord = function (array) {
        this.records.push(array);
        return this;
    };
    Sheet.prototype.removeRecord = function (index) {
        this.records.splice(index - 1, 1);
        return this;
    };
    Sheet.prototype.setRecords = function (records) {
        this.records = records;
        return this;
    };    
    /////////////
    // Parsers
    ////////////

    // Base Class
    var BaseParser = function () {};
    BaseParser.prototype = {
        _filetype   : '',
        _sheet      : [],
        getSheet    : function(number) {
            number = number || 1;
            return this._sheet[number - 1].records;
        },
        loadFile    : function (file, callback) {
            var self = this;
            var filetype = Utils.getFiletype(file.name);
            if (Utils.isEqual(filetype, self._filetype, true)) {
                var reader = new FileReader();
                reader.onload = function () {
                    self.loadString(this.result, 0);
                    callback.apply(self);
                };
                reader.readAsText(file);
            } else {
                throw Exception.FILE_EXTENSION_MISMATCH;
            }
            return self;
        },
        loadString  : function (string, sheetnum) {
            throw Exception.UNIMPLEMENTED_METHOD;
        }
    };
    // CSV
    var CSVParser = function () {};
    CSVParser.prototype = new BaseParser();
    CSVParser.prototype._delimiter = Char.COMMA;
    CSVParser.prototype._filetype = Format.CSV;
    CSVParser.prototype.loadString = function (str, sheetnum) {
        // TODO: implement real CSV parser
        var self = this;
        sheetnum = sheetnum || 0;
        self._sheet[sheetnum] = new Sheet();       
        
        str.replace(Regex.LINEBREAK, Char.NEWLINE)
           .split(Char.NEWLINE)
           .forEach(function(el, i)
        {
            var sp = el.split(Regex.COMMA);
            var row = [];
            sp.forEach(function(cellText) {
                if (cellText !== self._delimiter) {
                    cellText = cellText.replace(Regex.QUOTATION, "$2");
                    cellText = cellText.replace(Regex.TWO_QUOTES, "\"");
                    row.push(new Cell(cellText));
                }
            });
            self._sheet[sheetnum].insertRecord(row);
        });
        return self;
    };
    CSVParser.prototype.setDelimiter = function (separator) {
        this._delimiter = separator;
        return this;
    };
    
    // Export var
    var Parser = {
        CSV : CSVParser
    };
    /////////////
    // Exports
    ////////////

    var CSVUtility = {
        Cell                : Cell,
        DataType            : DataType,
        Exception           : Exception,
        isSupportedBrowser  : Utils.isSupportedBrowser(),
        Parser              : Parser,
        Sheet               : Sheet
    };
    window.CSVUtility = CSVUtility;

})(this);