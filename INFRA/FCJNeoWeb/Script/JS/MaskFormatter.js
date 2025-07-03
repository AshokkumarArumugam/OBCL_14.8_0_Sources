/*----------------------------------------------------------------------------------------------------
**
** File Name    : MaskFormatter.js
**
** Module       : FCJWeb
**
** This source is part of the Oracle Flexcube Universal Banking
** Software System and is copyrighted by Oracle Financial Services Software Limited.

** All rights reserved.  No part of this work may be reproduced,
** stored in a retrieval system, adopted or transmitted in any form
** or by any means, electronic, mechanical, photographic, graphic,
** optic recording or otherwise, translated in any language or
** computer language, without the prior written permission  from Oracle Financial Services
** Software Limited.

** Oracle Financial Services Software Limited.,
** 10-11, SDF I, SEEPZ, Andheri (East),
** MUMBAI - 400 096.
** INDIA.

Copyright © 2004-2011   by Oracle Financial Services Software Limited..
---------------------------------------------------------------------------------------------------- 
*/
var DIGIT_KEY = '#';
var ANYTHING_KEY = '*';
var UPPERCASE_KEY = 'U';
var LOWERCASE_KEY = 'L';
var HEX_KEY = 'H';
var MASK_KEY_CHARS = DIGIT_KEY + ANYTHING_KEY + UPPERCASE_KEY + LOWERCASE_KEY + HEX_KEY;

function MB3MaskFormatter(value, mask)
{
    this.mask = "";
    this.value = "";
    this.displayValue = "";
    this.valid = true;

    this.mask = mask;

    /** List of invalid characters i.e characters forming part of the mask and cannot be used in input value */
    var invalidCharacters = getInvalidCharacters(mask);

    var valueIndex = 0;
    var maskSegment = "";
    var valueSegment = "";
    var nextMaskChar = ""; //We loop through the mask one character at a time
    var nextValueChar = ""; //Loop through the value entered, one character at a time
    var nextLiteral = ""; //Character in mask that will appear in input, as it is

    for (var maskIndex = 0; maskIndex < mask.length; maskIndex++)
    {
        //Get the next mask and value character
        nextMaskChar = this.mask.substr(maskIndex, 1);
        if (valueIndex < value.length)
        {
            nextValueChar = value.substr(valueIndex, 1);
        }

        //As per mask, the current position should be a mask character
        if (MASK_KEY_CHARS.indexOf(nextMaskChar) < 0)
        {
            //Format the current segment
            var fmtSegment = formatSegment(valueSegment, maskSegment);
            if (fmtSegment.length == maskSegment.length)
            {
                this.value += fmtSegment;
                this.displayValue += fmtSegment;
                this.displayValue += nextMaskChar;

                valueSegment = "";
                maskSegment = "";

                //If the value, contains this mask char, consider it as processed
                if (nextValueChar == nextMaskChar)
                {
                    valueIndex++;
                }
            } else
            {
                //After formatting a segment, if the length of formatted segment
                //is not equal to mask segment, it is an error
                displayMsg('ST-COM001', mask + '~');
                this.valid = false;
                break;
            }

        } else
        {
            //As per mask, current position is a digit or a character
            maskSegment += nextMaskChar;

            if (valueIndex < value.length)
            {
                switch (nextMaskChar)
                {
                case DIGIT_KEY:
                    if ((nextValueChar >= 0) && (nextValueChar <= 9))
                    {
                        //Digit
                        valueSegment += nextValueChar;
                        valueIndex++;
                    }
                    break;
                case ANYTHING_KEY:
                    //Any character other than ones used in mask as separator
                    if (invalidCharacters.indexOf(nextValueChar) < 0)
                    {
                        valueSegment += nextValueChar;
                        valueIndex++;
                    }
                    break;
                case UPPERCASE_KEY:
                    //Convert to Uppercase
                    if (invalidCharacters.indexOf(nextValueChar) < 0)
                    {
                        valueSegment += nextValueChar.toUpperCase();
                        valueIndex++;
                    }
                    break;
                case LOWERCASE_KEY:
                    //Convert to Lowercase
                    if (invalidCharacters.indexOf(nextValueChar) < 0)
                    {
                        valueSegment += nextValueChar.toLowerCase();
                        valueIndex++;
                    }
                    break;
                case HEX_KEY:
                    if (((nextValueChar >= 0) && (nextValueChar <= 9)) || ((nextValueChar.toUpperCase() >= "A") && (nextValueChar.toUpperCase() <= "F")))
                    {
                        //Digit
                        valueSegment += nextValueChar;
                        valueIndex++;
                    }
                    break;
                default:
                    //Mask character
                    break;
                }
            }
        }
    } //for

    //Process last segment
    if ((this.valid == true) && (maskSegment != ""))
    {
        var fmtSegment = formatSegment(valueSegment, maskSegment);
        if (fmtSegment.length == maskSegment.length)
        {
            this.value += fmtSegment;
            this.displayValue += fmtSegment;
            valueSegment = "";
            maskSegment = "";
        } else
        {
            displayMsg('ST-COM001', mask + '~');
            this.valid = false;
        }
    }

    if ((this.valid == true) && (valueIndex < value.length))
    {
        displayMsg('ST-COM001', mask + '~');
        this.valid = false;
    }
}

//Methods available in MB3MaskFormatter object
MB3MaskFormatter.prototype.isValid = isValid;
MB3MaskFormatter.prototype.getDisplayValue = getDisplayValue; //When DSO value changes, this function is called by the hidden field bound to DSO 
MB3MaskFormatter.prototype.getDSOValue = getDSOValue; //When user enters a value and leaves the field, this function sets the value in DSO bound hidden field

function isValid()
{
    return (this.valid);
}

function getDisplayValue()
{
    return this.displayValue;
}

function getDSOValue()
{
    return this.value;
}

function getInvalidCharacters(mask)
{
    var retVal = "";

    var re = new RegExp("[^" + MASK_KEY_CHARS + "]", "g");
    var tmp;
    while ((tmp = re.exec(mask)) != null)
    {
        if (retVal.indexOf(tmp) < 0) retVal += tmp;
    }

    return retVal;
}

function formatSegment(valueSegment, maskSegment)
{
    var retVal = valueSegment;
    var tmp = "";

    if ((valueSegment == null) || (valueSegment == ""))
    {
        retVal = zeroPrefix("", maskSegment.length);
    } else
    {
        var re = new RegExp("[^" + maskSegment.substr(0, 1) + "]", "g");
        if (tmp = re.exec(maskSegment) == null)
        {
            retVal = zeroPrefix(valueSegment, maskSegment.length);
        }
    }

    return retVal;
}

function displayValue(dataBoundElem)
{
    var idDispVal = dataBoundElem.id + "I";
    var inpElem = dataBoundElem.parentNode.parentNode.parentNode[idDispVal];
    var mask = inpElem.getAttribute("mask");
    var val = dataBoundElem.value;

    if (val && val != "")
    {
        var mb3Value = new MB3MaskFormatter(val, mask);
        inpElem.value = mb3Value.getDisplayValue();
    } else
    {
        inpElem.value = "";
    }
    if ((document.getElementById('op').value != 'QUERY') && (arguments.length == 1))
    {
        inpElem.fireEvent("onchange");//TODO
    }
}

var gCurDisplayMaskValue = 0;
function acceptInputValue(idVal)
{
    var curInpElem = getEventSourceElement(event);
    gCurDisplayMaskValue = curInpElem.value;
}

function validateInputValue(idVal)
{
    var curInpElem = getEventSourceElement(event);
    var curDataBoundElem = curInpElem.parentNode.parentNode.parentNode[idVal];
    var mask = curInpElem.getAttribute("mask");
    var inpVal = curInpElem.value;

    if (inpVal && inpVal != "")
    {
        var mb3Value = new MB3MaskFormatter(inpVal, mask);
        if (mb3Value.isValid())
        {
            if (gCurDisplayMaskValue != inpVal)
            {
                curDataBoundElem.value = mb3Value.getDSOValue();
            } else
            {
                displayValue(curDataBoundElem, false);
            }
        } else
        {
            event.returnValue = false;
        }
    } else
    {
        if (curDataBoundElem.value != '') curDataBoundElem.value = '';
    }
}
