$.extend( true, $.fn.dataTable.defaults, {
	searchDelay: 500,
	lengthMenu: [25, 50, 100, 500, 750]
});

if (window['localStorage']) {
	var pageUrl = location.pathname;

	$(document)
		// store selected records per page when changed
		.on('length.dt', function (e, settings, newLength) {
			localStorage.setItem(pageUrl + '.' + settings.sAjaxSource + '.pageLength', newLength);
		})
		// store paging start point before preforming an action
		.on('preInit.dt', function (e, settings) {
			var api = new $.fn.dataTable.Api(settings);

			$(e.target).closest('form').on('submit', function () {
				localStorage.setItem(pageUrl + '.' + settings.sAjaxSource + '.displayStart', api.page.info().start);
			});
		})
		// restore selected records per page and paging start point
		.on('preInit.dt', function (e, settings) {
			var prefix = pageUrl + '.' + settings.sAjaxSource;
			var api = new $.fn.dataTable.Api(settings);

			api.page.len(localStorage.getItem(prefix + '.pageLength') || settings._iDisplayLength || 100);
			settings.iInitDisplayStart = localStorage.getItem(prefix + '.displayStart') || 0;
			localStorage.removeItem(prefix + '.displayStart');
		});
}

/*!
 * Mach 1 Media CMS 2012 Global Javascript Functions
 *
 * Roger Glenn
 * roger@mach1media.com
 * Last Update: 2012-03-30
 *
 *
*/

/**
 * Confirm Delete
 */
function confirmDelete() {
	var agree = confirm("Are you sure you wish to delete this item?");
	if (agree) {
		return true;
	} else {
		return false;
	}
}

/**
 * is_int helper function
 */
function is_int(value){
	if((parseFloat(value) == parseInt(value)) && !isNaN(value)){
		return true;
	} else {
		return false;
	}
}

/**
 * limitChars
 */
function limitChars(textid, limit, infodiv) {
	var text = $('#'+textid).val();
	var textlength = text.length;
	if(textlength > limit) {
		$('#' + infodiv).html('Nice work!');
		$('#'+textid).val(text.substr(0,limit));
		return false;
	} else {
		$('#' + infodiv).html((limit - textlength) + ' characters remaining');
		return true;
	}
}

/**
 * autoformat phone numbers
 */
var areacodeLength	= 3;
var firstThree			= 3;
var previousLength	= null;
var thisInput				= null;
var originalLength	= null;
var thisAreacode		= null;
var thisFirstThree	= null;
var thisLastFour		= null;
var phone_test			= false;
var international		= false;
function autoFormat(input,type) {
	// lock out NS4
	if (!document.layers) {
		if (type == 'phone') {
			// var temp_selection = input.selectionStart;
			// alert("selectionStart=" + input.selectionStart);
			var addFirstParen		= false;
			var addSecondParen	= false;
			var addDash					= false;
			thisInput						= input.value.replace(/[. ()-\/]/gi,'');

			// if first input is a "+" assume its an international number and do not format
			if (input.value.length == 1 && input.value == '+') { international = true; return true; }
			else if (input.value.length == 1 && input.value == '(') { previousLength = 1; return true; }

			// don't do anything on backspace
			else if (input.value.length >= previousLength && international == false) {
				thisAreacode		= thisInput.substr(0,3);
				thisFirstThree	= thisInput.substr(3,3);
				thisLastFour		= thisInput.substr(6,4);

				// add '('
				if (thisInput.length > 0) { addFirstParen = true; }
				// add ') '
				if (thisAreacode.length == areacodeLength) { addSecondParen = true; }
				// add '-'
				if (thisFirstThree.length == firstThree) { addDash = true; }

				// add everything, assign to field
				if (addFirstParen) { thisAreacode = '(' + thisAreacode; }
				if (addSecondParen) { thisAreacode += ') '; }
				if (addDash) { thisFirstThree += '-'; }
				if (phone_test) { alert('writing'); }
				input.value = thisAreacode + thisFirstThree + thisLastFour;
			}

			previousLength = input.value.length
			// if (temp_selection && temp_selection != 'undefined') { input.selectionStart = temp_selection; input.selectionEnd = temp_selection; }
		}
	}
}

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * AJAX SORT LIST ITEMS IN TABLE
 */
function ajaxSort(data, url) {
	// send ajax post
	$.ajax({
		type:     "POST",
		url:      url,
		data:     data,
		dataType: 'json',
		success:  function(response){
			//stripe_table();
			console.log(response);
		},
		error: function(response){
			console.error(response);
		}
	});
}
/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * DATATABLES INIT
 */
function initDatatables() {
	if($("#item-list2").length) {
        // moved to admin/campaigns/report
    }
	if ($("#item-list").length){
		if ($("#item-list").hasClass('products')) {
  			// moved to /views/admin/campaigns/report.php
        } else if ($("#item-list").hasClass('campaign_products')) {
  			// moved to views/admin/campaign/product_picker.php
        } else if ($("#item-list").hasClass('members')) {
			// moved to /views/admin/members/index.php
		} else if ($("#item-list").hasClass('unregistered_member')) {
			// moved to admin/members/unregistered_members
		} else if ($("#item-list").hasClass('unregistered_vendor')) {
			var oTable = $('#item-list').dataTable( {
				"sDom": "<'row'<'col-md-12'f>r>t<'row'<'col-md-3'i><'col-md-3'l><'col-md-6'p>>",
				"sPaginationType": "bootstrap",
				"oLanguage": {
					"sSearch": "_INPUT_",
					"sLengthMenu": "_MENU_ <span class='langhook'>member_dashboard_form_fieldset_label_1</span>",
					"sProcessing": "<img src='/snapshot/ajax-loader.gif'>"
				},
				"fnInitComplete": function () {
					$("#item-list_filter").addClass( "input-group" ).append( "<span class=\"input-group-btn\"><button class=\"btn btn-info\" type=\"button\">Search</button></span>" );
					$(".prev a").html('&laquo;');
					$(".next a").html('&raquo;');
					$('.batch_item').change(function(){
						if($('.batch_item').is(':checked')){
						   $("#delete").prop('disabled', false);
						} else {
						   $("#delete").prop('disabled', true);
						}
					});
					replaceSearch();
				},
				"fnDrawCallback": function ( oSettings ) {
					$("#delete").prop('disabled', true);
					$('.batch_item').change(function(){
                        if($('.batch_item').is(':checked')){
                            $("#delete").prop('disabled', false);
                        } else {
                            $("#delete").prop('disabled', true);
                        }
                    });
					var selectAll = true;
					$('#select_all').prop('checked', false);
					$('#select_all').on('click', function() {
						if (selectAll) {
							$('.batch_item, .batch_item_disabled').prop('checked', true);

							if ($('.selectpicker li[rel="4"]').hasClass('selected')) {
								$('#reactivate').prop('disabled', false);
							} else {
								$("#delete").prop('disabled', false);
								$("#send_email").prop('disabled', false);
							}
						} else {
							$('.batch_item, .batch_item_disabled').prop('checked', false);

							if ($('.selectpicker li[rel="4"]').hasClass('selected')) {
								$('#reactivate').prop('disabled', true);
							} else {
								$("#delete").prop('disabled', true);
								$("#send_email").prop('disabled', true);
							}
						}
						selectAll  = !selectAll;
					});
				},
				"aoColumnDefs": [
					//{ "bVisible": false, "aTargets": [ 0 ] },
					{ "bSortable": false, "aTargets": [ 3 ] },
					{ "sWidth": "150px", "aTargets": [ 0 ] },
					{ "sWidth": "250px", "aTargets": [ 1 ] },
					{ "sWidth": "10px", "aTargets": [ 3 ] }
		    	],
				"aaSorting": [[ 2, 'asc' ]],
				"iDisplayLength": 100,
				"bProcessing": true,
				"bServerSide": true,
				"sAjaxSource": "/admin/vendors/remind",
				"bDeferRender": true,
				'fnServerData': function(sSource, aoData, fnCallback){
		              $.ajax({
		                'dataType': 'json',
		                'type'    : 'POST',
		                'url'     : sSource,
		                'data'    : aoData,
		                'success' : fnCallback
		              });
				}
			} );
		} else if ($("#item-list").hasClass('vendors')) {
			// moved to views/admin/vendors/index.php
		} else if ($("#item-list").hasClass('admins')) {
			// moved to views/admin/admins.index.php
		} else if ($("#item-list").hasClass('members_dashboard')) {
        	// Moved to views/members/dashboard/index.php
		} else if ($("#item-list").hasClass('vendors_dashboard')) {
			// moved to views/vendor/dashboard/index.php
		} else if ($("#item-list").hasClass('vendors_products')) {
            // moved to views/vendor/products/index.php
        } else if ($("#item-list").hasClass('campaign_report')) {
            // moved to views/admin/campaigns/report.php
        } else if ($("#item-list").hasClass('sent_campaigns')) {
            var oTable = $('#item-list').dataTable( {
                "sDom": "<'row'<'col-md-12'f>><'row'<'col-md-12'>r>t<'row'<'col-md-3'i><'col-md-3'l><'col-md-6'p>>",
                "sPaginationType": "bootstrap",
                "oLanguage": {
                    "sSearch": "_INPUT_",
                    "sLengthMenu": "_MENU_ <span class='langhook'>member_dashboard_form_fieldset_label_1</span>",
                    "sProcessing": "<img src='/snapshot/ajax-loader.gif'>"
                },
                "fnInitComplete": function () {
                    $('.batch_item').change(function(){
                        if($('.batch_item').is(':checked')){
                            $("#delete").prop('disabled', false);
                        } else {
                            $("#delete").prop('disabled', true);
                        }
                    });
                    $("#item-list_filter").addClass( "input-group" ).append( "<span class=\"input-group-btn\"><button class=\"btn btn-info\" type=\"button\">Search</button></span>" );
                    $("#item-list_filter").hide();
                    $(".prev a").html('&laquo;');
                    $(".next a").html('&raquo;');
                },
                "fnDrawCallback": function ( oSettings ) {
                    $("#delete").prop('disabled', true);
                    $('.batch_item').change(function(){
                        if($('.batch_item').is(':checked')){
                            $("#delete").prop('disabled', false);
                        } else {
                            $("#delete").prop('disabled', true);
                        }
                    });
                    $("#item-list_length").selectpicker({style: 'btn-info col-sm-2'});
                    $('body.products span.filter-option').text($('body.products select#type').attr('title'));
                },
                "aoColumnDefs": [
                    { "bSortable": false, "aTargets": [ 9 ]},
                    { "sWidth": "275px", "aTargets": [ 0 ] },
                    { "sWidth": "100px", "aTargets": [ 5 ] },
                    { "sWidth": "100px", "aTargets": [ 6 ] },
                    { "sWidth": "115px", "aTargets": [ 7 ] },
                    { "bVisible": false, "aTargets" : [ 4 ] },
                    { "iDataSort": 4, "aTargets" : [ 5 ] }
                ],
                "aaSorting": [],
                "bProcessing": true,
                "bServerSide": false,
                "iDisplayLength": 5,
                "sAjaxSource": "/admin/campaigns/sent_datatable",
                "bDeferRender": true,
                "bFilter": false,
                "bLengthChange": false
            });
        } else if ($("#item-list").hasClass('sent_report')) {
  			var oTable = $('#item-list').dataTable( {
                "sDom": "<'row'<'col-md-12'f>><'row'<'col-md-12'>r>t<'row'<'col-md-3'i><'col-md-3'l><'col-md-6'p>>",
                "sPaginationType": "bootstrap",
                "oLanguage": {
					"sSearch": "_INPUT_",
					"sLengthMenu": "_MENU_ <span class='langhook'>member_dashboard_form_fieldset_label_1</span>",
					"sProcessing": "<img src='/snapshot/ajax-loader.gif'>"
				},
                "fnInitComplete": function () {
                    $('.batch_item').change(function(){
                        if($('.batch_item').is(':checked')){
                            $("#delete").prop('disabled', false);
                        } else {
                            $("#delete").prop('disabled', true);
                        }
                    });
                    $("#item-list_filter").addClass( "input-group" ).append( "<span class=\"input-group-btn\"><button class=\"btn btn-info\" type=\"button\">Search</button></span>" );
                    $("#item-list_filter").hide();
					$(".prev a").html('&laquo;');
					$(".next a").html('&raquo;');
                },
                "fnDrawCallback": function ( oSettings ) {
					$("#delete").prop('disabled', true);
					$('.batch_item').change(function(){
                        if($('.batch_item').is(':checked')){
                            $("#delete").prop('disabled', false);
                        } else {
                            $("#delete").prop('disabled', true);
                        }
                    });
                    $("#item-list_length").selectpicker({style: 'btn-info col-sm-2'});
	                $('body.products span.filter-option').text($('body.products select#type').attr('title'));
				},
                "aoColumnDefs": [
                    { "bSortable": false, "aTargets": [ 9 ]},
                    { "sWidth": "275px", "aTargets": [ 0 ] },
                    { "sWidth": "100px", "aTargets": [ 5 ] },
                    { "sWidth": "100px", "aTargets": [ 6 ] },
                    { "sWidth": "115px", "aTargets": [ 7 ] },
					{ "bVisible": false, "aTargets" : [ 4 ] },
					{ "iDataSort": 4, "aTargets" : [ 5 ] }
				],
                "aaSorting": [],
                "bPaginate": true,
                "bProcessing": true,
                "bServerSide": false,
                "iDisplayLength": 25,
                "sAjaxSource": "/admin/campaigns/sent_datatable",
                "bDeferRender": true,
                "bFilter": false
            });
		}
	}
}

// update-tracking ---------------------------------
function updateTracking() {
	if ($('.update-tracking').length) {
		$('.update-tracking').off('click').on('click', function(e) {
			e.preventDefault();
			var request_id = $(this).data('request-id');
			var number     = $('#request_' + request_id + '_tracking_number').val();
			var carrier    = $('#request_' + request_id + '_tracking_carrier').val();
			var url        = $('#request_' + request_id + '_tracking_url').val();
			var shipped    = $('#request_' + request_id + '_shipping_date').val();
			var remove_shipping_date = $('#request_' + request_id + '_remove_shipping_date').prop('checked');
			$.post('/ajax/update_tracking_info/', {
				id : request_id,
				tracking_number : number,
				tracking_carrier : carrier,
				tracking_url : url,
				shipping_date: shipped,
				remove_shipping_date: remove_shipping_date
			},
			function(response) {
				console.log(response);
				$('#modal_' + request_id).modal('hide');
				var oTable = $('#item-list').dataTable();
				oTable._fnAjaxUpdate();
			});
			return false;
		});
	}
}

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * document ready
 */
$(function() {
	detectBrowser();

	// TBS Alerts
	$('.alert').alert();

	// AJAX product request
	$('a.confirm-request').one('click', function(){
		var url = $(this).data('url');

		$(this).attr("disabled", "disabled");
		$(this).addClass('disabled');

		$.get(url, function(response){
			console.log(response);
		})
		.complete(function(){
			window.location = "/products";
		});

		return false;
	});
	$('.confirm-request').dblclick(function(){
		$(this).attr("disabled", "disabled");
		$(this).addClass('disabled');
		alert('Please only click Confirm button once.');
		return false;
	});

	// filter list
	/*if ($('#filter-items').length) {
		$('#filter-items').keyup(function(){
			$('#item-list tbody tr').hide();
			$('#item-list tbody td:containsIgnoreCase("'+$(this).val()+'")').parent().show();
		});
	}*/

	// clickable column headers
	$("table.tablesorter").tablesorter();

	// drag-and-drop sorting tables
	if ($("#item-list").length) {
		/*
		$("#item-list tbody").tableDnD({
			// onDrop : function(table, row){updateSortOrder(table, row)}
			onDrop: function(table, row) {
				ajaxSort($('#item-list tbody').tableDnDSerialize(), $('#sort-function').val());
			}
		});
		*/

		// select all rows
		$('#select_all').toggle(function() {
			if ($('.batch_item').length > 0) {
				$('.batch_item').each(function(){
					$(this).attr('checked',true);
				});
				$("#delete").prop('disabled', false);
				$("#send_email").prop('disabled', false);
				$("#mark_as_shipped").prop('disabled', false);
			} else if ($('.batch_item_disabled').length > 0) {
				$('.batch_item_disabled').each(function() {
					$(this).attr('checked', true);
				});
				$("#reactivate").prop('disabled', false);
			}
		},
		function(){
			if ($('.batch_item').length > 0) {
				$('.batch_item').each(function(){
					$(this).attr('checked',false);
				});
				$("#delete").prop('disabled', true);
				$("#send_email").prop('disabled', true);
				$("#mark_as_shipped").prop('disabled', true);
			} else if ($('.batch_item_disabled').length > 0) {
				$('.batch_item_disabled').each(function(){
					$(this).attr('checked',false);
				});
				$("#reactivate").prop('disabled', true);
			}
		});

		$('.batch_item').change(function(){
			if($('.batch_item').is(':checked')){
			   $("#delete").prop('disabled', false);
			} else {
			   $("#delete").prop('disabled', true);
			}
		});
	}

	if ($("#export-form").length) {
		$('.export_item').change(function(){
			if($('.export_item').is(':checked')){
			   $(this).siblings(':checkbox').attr('checked',false);
			   $("#export").prop('disabled', false);
			} else {
			   $("#export").prop('disabled', true);
			}
		});
		$("#export").click(function(){
			$("#export-form").submit();
		});
	}

	// init datepickers
	if ($(".datepicker").length) {
		$(".datepicker").datepicker({
			dateFormat: 'yy-mm-dd'
		});
	}

	// init pagination
	/*if ($(".pagination").length) {
		$('.pagination li a').click(function(){
			return false;
		});
		$('.pagination li a').not('.total-results').click(function(){
			var target = $(this).attr('href');

			$('.pagination li').removeClass('active');
			$(this).parent('li').addClass('active');
			$('.paginated .page').hide();
			$(target).show();
		});
	}*/

	$("img.lazy").lazyload({
        event : "turnPage",
        effect : "fadeIn"
    });
/*
	$(".jpage-pagination.products").jPages({
		containerID : "jpage-container",
		//animation   : "fadeInUp",
		perPage : 12,
		callback    : function( pages, items ){
        	// lazy load current images
			items.showing.find("img").trigger("turnPage");
			// lazy load next page images
			items.oncoming.find("img").trigger("turnPage");
        }
	});
*/
	// product modals
	$('a.product-info').click(function(){
		var modal = $(this).attr('href');
		$(modal).find('.request').hide();
		$(modal).find('.info').show();
		$('.modal-header h3').empty().html('More Information');
	});
	$('a.product-request').click(function(){
		var modal = $(this).attr('href');
		$(modal).find('.info').hide();
		$(modal).find('.request').show();
		$('.modal-header h3').empty().html('Confirm Product Request for Review');
	});

	// help popovers
	$("#example").popover();
/*
	$('.sold-out').each(function(){
		var height = $(this).parent().css('height');
		$(this).css('height', height);
	});
*/
	// Fix for bootstrap IE7 bug where modal z-index is behind overlay
	$('.modal').appendTo($('body'));

	// set confirm modals for delete buttons
	$("#delete").confirm({
	    confirm: function(button) {
	       form = $('#list-form');
	       tempElement = $("<input type='hidden'/>");
	       tempElement.attr("name", "delete").val("delete").appendTo(form);
	       form.submit();
	    },
	    cancel: function(button) {
	        // do something
	    },
	    post: true
	});

  $("#forget").confirm({
    confirm: function(button) {
      form = $('#list-form');
      tempElement = $("<input type='hidden'/>");
      tempElement.attr("name", "forget").val("forget").appendTo(form);
      form.submit();
    },
    cancel: function(button) {
      // do something
    },
    post: true
  });

	// set confirm modals for delete buttons
    $("#reactivate").confirm({
        confirm: function(button) {
            form = $('#list-form');
            tempElement = $("<input type='hidden'/>");
            tempElement.attr("name", "reactivate").val("reactivate").appendTo(form);
            form.submit();
        },
        cancel: function(button) {
            // do something
        },
        post: true
    });

	$("#export").click(function() {
		form = $('#export-form');
	});

	// splash page faqs
	if ($("#faqs_trigger").length) {
		$("#faqs_trigger").click(function(){
			$("#faqs").slideDown();
			$("#faqs_trigger").hide();
			return false;
		});
	}
	// Init Datatables
	initDatatables();
	addDatatableClasses();

	$('.selectpicker').selectpicker();
	$('body.members span.filter-option').text($('body.members select#status').attr('title'));
	$('body.admins span.filter-option').text($('body.admins select#status').attr('title'));
	$('body.vendors span.filter-option').text($('body.vendors select#status').attr('title'));
	$('body.products span.filter-option').text($('body.products select#type').attr('title'));

});

function addDatatableClasses() {
    $('#vendor_filter select').addClass('form-control');
    $('#cat_filter select').addClass('form-control');
    $('.dataTables_filter input').addClass('form-control');
    $('#item-list_length select').addClass('form-control');
    $('.dataTables_paginate ul').addClass('pagination');
    $('#item-list_wrapper .row .span6').addClass('col-xs-6');
}

function restrictToFloat(event) {

	var val = $(this).val();
	var decimalPointPlace = val.indexOf('.');
	var containsDecimalPoint = (decimalPointPlace != -1);
	var cursorPlace = $(this)[0].selectionStart;

	if (event.shiftKey) {
		event.preventDefault();
	}

	// If FORWARD ARROW or BACK ARROW, return true
	if (event.keyCode == 37 || event.keyCode == 39) {
		return true;
	}

	// If one decimal place is already in the string, return false
	if (event.keyCode == 190 && containsDecimalPoint) {
		event.preventDefault();
		return false;
	}

	// Prevent entering a decimal place which will create 3 decimal digits
	if (event.keyCode == 190 && val.length - 1 - cursorPlace >= 2) {
		event.preventDefault();
		return false;
	}

	// Prevent backspacing decimal point in the middle of a number
	if (event.keyCode == 8 && cursorPlace == decimalPointPlace + 1 && decimalPointPlace != val.length - 1 && val.length >= 6) {
		event.preventDefault();
		return false;
	}

	// Prevent deleting decimal point in the middle of a number
	if (event.keyCode == 46 && cursorPlace == decimalPointPlace && decimalPointPlace != val.length - 1 && val.length >= 6) {
		event.preventDefault();
		return false;
	}

	// If DEL or BACKSPACE od DECIMAL POINT, return true
	if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 190) {
		return true;
	}
	else {
		var parts = val.split('.');

		// Validate left of decimal point
		if ((!containsDecimalPoint || cursorPlace <= decimalPointPlace) && parts[0] && parts[0].length >= 4) {
			event.preventDefault();
			return false;
		}

		// Validate right of decimal point
		if ((containsDecimalPoint && cursorPlace > decimalPointPlace) && parts[1] && parts[1].length >= 2) {
			event.preventDefault();
			return false;
		}

		if (event.keyCode < 95) {
			if (event.keyCode < 48 || event.keyCode > 57) {
				event.preventDefault();
			}
		} else {
			if (event.keyCode < 96 || event.keyCode > 105) {
				event.preventDefault();
			}
		}
	}
}

function preventNonpositiveNumbers(event) {
	if (event.shiftKey) {
        event.preventDefault();
    }

    if (event.keyCode == 46 || event.keyCode == 8) {
    }
    else {
        if (event.keyCode < 95) {
            if (event.keyCode < 48 || event.keyCode > 57) {
                event.preventDefault();
            }
        }
        else {
            if (event.keyCode < 96 || event.keyCode > 105) {
                event.preventDefault();
            }
        }
    }
}

function isProductSKUValid($sku) {
	var $skuWithoutSpaces = $sku.replace(/\s/g, '');
	return /^[a-zA-Z0-9_-]+$/.test($skuWithoutSpaces);
}


function hideFormErrors(formSelector) {
	$(formSelector + ' input').removeClass('field-invalid');
	$(formSelector + ' div.input-error').hide();
}

function validateInputForm(formSelector) {

	$(formSelector + ' .error-value-taken').hide();

	// Initialize variable
	var validForm = true;

	// Validate required fields
	$(formSelector + ' input.required,' + formSelector + ' select.required').each(function() {
		if ($(this).val() == '' || $(this).val() == null) {
			validForm = false;
			$(this).addClass('field-invalid');
			$(this).siblings('.input-error.error-required').show();
			if ($(this).attr('id') == 'title') {
				$(".modal").animate({ scrollTop: 0 }, "slow");
			}
		} else {
			$(this).removeClass('field-invalid');
			$(this).siblings('.input-error.error-required').hide();
		}
	});

	var productId = $(formSelector + ' #product_id').val();

	// Validate SKU
	var validSKU = isProductSKUValid(productId);
	if (!validSKU && productId != '') {
		$(formSelector + ' #product_id').addClass('field-invalid');
		$(formSelector + ' #product_id').siblings('.error-bad-format').show();
		$(".modal").animate({ scrollTop: 0 }, "slow");
		validForm = false;
	} else if (productId == '') {
		$(formSelector + ' #product_id').siblings('.error-bad-format').hide();
		$(".modal").animate({ scrollTop: 0 }, "slow");
		validForm = false;
	} else {
		$(formSelector + ' #product_id').removeClass('field-invalid');
		$(formSelector + ' #product_id').siblings('.error-bad-format').hide();
	}

	// Validate FMV
	var validFmv = ($('#fmv').val() != '' && parseFloat($('#fmv').val()) > 0);
	if (!validFmv) {
		validForm = false;
		$('#fmv').addClass('field-invalid');
		$('#fmv').siblings('.input-error.error-required').show();
	} else {
		$('#fmv').removeClass('field-invalid');
		$('#fmv').siblings('.input-error.error-required').hide();
	}

	// Validate category
	if ($('#category-id').val() == '' || $('#category-id').val() == 'empty') {
		$('#category-error').show();
		$(".modal").animate({ scrollTop: 0 }, "slow");
		$('#category-auto-complete').addClass('field-invalid');
		validForm = false;
	} else {
		$('#category-error').hide();
		$('#category-auto-complete').removeClass('field-invalid');
	}

	return validForm;
}


function toggleStateVisibility(countryElement) {
	var country_code = countryElement.val();

	$('.states-list').hide();
	$('.states-list').find('*').attr('disabled', 'disabled');
	if (/US|CA|AU/.test(country_code)) {
		$('#states-list-' + country_code).show();
		$('#states-list-' + country_code).find('*').removeAttr('disabled');
		$('#states-hidden').attr('disabled', 'disabled');
	} else {
		$('#states-list-' + country_code).hide();
		$('#states-hidden').removeAttr('disabled', 'disabled');
	}
}
