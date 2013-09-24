Hierarchy and Order
===================

Move elements or change background positions at speeds relative to the speed a user is scrolling through a web page.

## Requirements

    <script type="text/javascript" src="jquery.js"></script>
    <script type="text/javascript" src="Length.js"></script>
    <script type="text/javascript" src="jquery.hao.js"></script>
    
* [jQuery](https://github.com/jquery/jquery)
* [Length.js](https://github.com/heygrady/Units/blob/master/Length.js) (or [Length.min.js](https://github.com/heygrady/Units/blob/master/Length.min.js)) from [Units](https://github.com/heygrady/Units) by [Grady Kuhnline](https://github.com/heygrady)

## Usage

    $(element).layered(options)
    $('body').layered({background:true});
    $('#fixed').layered({position:true});
    $('#fixed').layered({position:true, distance:5});
    $('#fixed').layered({position:true, distance 5, startScrollY:600, endScrollY:1000, startScrollX:20, endScrollX:60});
    
## Options

* **position** - True or false. Adjusts the position relative to the amount scrolled. The element must have the position style active (works with fixed, absolute, and relative). Default: false.
* **background** - True or false. Adjusts the position of the background relative to the amount scrolled. Should have the background-attachment fixed. Default: false.
* **distance** - Integer. The reciprocal of **distance** (reciprocal is 1/X or X^-1) is multiplied by the amount changed to create a faster or slower effect. The larger **distance** is, the less it changes (set it to Infinity and it doesn't change at all). The lesser **distance** is, the more it changes (set it to 0 and it will disappear because it's traveled to Infinity and beyond). Make **distance** negative and it will go the opposite direction scrolled. Default: 1.
* **Start and End scrolls** - **startScrollY** (Default: 0) and **endScrollY** (Default: Infinity) determine when to start and stop animating the figure when going up or down on a page. **startScrollX** (Default: 0) and **endScrollX** (Default: Infinity) do the same but for scrolling left or right. If you don't want an element to move left to right, for example, set **startScrollX** equal to Infinity. You can do the same for going up and down by setting **startScrollY** to Infinity.

## License: Public Domain
Please don't rename it or change credit away from me, James Anthony Bruno, because that would make me sad. It is fine, however, to make changes to Hierarchy and Order's core to suit your needs for use in your products (whether commercial, personal, or non-profit). If you believe you've found a better way for Hierarchy and Order to work, go ahead and message me and let me know! I would love to implement your fix.
