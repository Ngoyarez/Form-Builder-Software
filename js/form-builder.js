$(function() {
    // Logic to add a new question 
    $('#add_q-item').click(function(e) {
        var el = $('#q-item-clone').clone()
        var f_arr = []
        $('#question-field .question-item').each(function() {
            f_arr.push(parseInt($(this).attr('data-item')))
        })
        var i = f_arr.length
            // console.log(i)
        el.find('.question-item').attr('data-item', i)
        el.find('textarea').attr('name', 'q[' + i + ']')
        $('#question-field').append(el.html())
        $('body,html').animate({ scrollTop: $(this).offset().top }, 'fast')
        _initilize()
    });

    // Sortable functionality for question items
    $('#question-field').sortable({
            handle: '.item-move',
            classes: {
                "ui-sortable": "highlight"
            }
        })
        // $("#question-field").disableSelection();


        // Initialize form builder
    function _initilize() {
        $('[contenteditable="true"]').each(function() {
            $(this).on("blur focusout", function() {
                if ($(this).text() == "") {
                    $(this).text($(this).attr("title"))
                }
            })

        })
        $('.question-item .form-check').find('label').on('keypress keyup paste cut', function() {
            $(this).siblings('input').val($(this).text())
        })
        $('.question-item .req-chk').click(function() {
            if ($(this).siblings('input[type="checkbox"]').is(":checked") == true) {
                $(this).siblings('input[type="checkbox"]').prop("checked", false).trigger("change")
            } else {
                $(this).siblings('input[type="checkbox"]').prop("checked", true).trigger("change")
            }
        })
        $('.rem-q-item').click(function() {
            $(this).closest('.question-item').remove()
        })
        $('.req-item').change(function() {
            var _parent = $(this).closest('.question-item')
            if ($(this).is(":checked") == true) {
                _parent.find("input").first().attr('required', true)
                _parent.find("textarea").first().attr('required', true)
                $(this).attr('checked', true)
            } else {
                _parent.find("input").first().attr('required', false)
                _parent.find("textarea").first().attr('required', false)
                $(this).attr('checked', false)
            }
        })

        // Bind events for choice option select
        $('.choice-option').change(function() {
            var choice = $(this).val()
            var _field = $(this).closest('.question-item').attr('data-item')
            if (choice == "p") {
                paragraph($(this), _field)
            } else if (choice == "checkbox") {
                $(this).closest('.question-item').find('.choice-field').html('<button type="button" class="add_chk btn btn-sm btn-default border"><i class="fa fa-plus"></i> Add option</button>')
                add_checkbox()
                for (var i = 0; i < 3; i++) {
                    checkbox_field($(this), _field, "Enter Option")
                }
            } else if (choice == "radio") {
                $(this).closest('.question-item').find('.choice-field').html('<button type="button" class="add_radio btn btn-sm btn-default border"><i class="fa fa-plus"></i> Add option</button>')
                add_radio()
                for (var i = 0; i < 3; i++) {
                    radio_field($(this), _field, "Enter Option")
                }
            } else if (choice == "file") {
                file_field($(this), _field)
            }else if(choice == "short_answer"){
                short_answer_field($(this), _field);
            }
            else if(choice == "dropdown"){
                dropdown_field($(this), _field);
            }
            else if(choice == "date"){
                date_field($(this), _field);
            }
            else if(choice == "time"){
                time_field($(this), _field);
            }
            $(this).closest('.question-item').find('.req-item').trigger('change')
        })
    }

    // Function to handle dropdown field and editing of options
    function dropdown_field(_this, _field) {
        var selectElement = $('<select>');
        selectElement.attr({
            "name": "q[" + _field + "]",
            "class": "form-control col-sm-12"
        });
        // Add options as needed
        selectElement.append('<option value="option1"><span contenteditable="true">Option 1</span></option>');
        selectElement.append('<option value="option2"><span contenteditable="true">Option 2</span></option>');
        // Append dropdown to choice field
        _this.closest('.question-item').find('.choice-field').html(selectElement);
    }
    



    // Function to handle date field
    function date_field(_this, _field) {
        var el = $('<input>');
        el.attr({
            "type": "date",
            "name": "q[" + _field + "]",
            "class": "form-control col-sm-12"
        });
        // Append date input to choice field
        _this.closest('.question-item').find('.choice-field').html(el);
    }

    // Function to handle time field
    function time_field(_this, _field) {
        var el = $('<input>');
        el.attr({
            "type": "time",
            "name": "q[" + _field + "]",
            "class": "form-control col-sm-12"
        });
        // Append time input to choice field
        _this.closest('.question-item').find('.choice-field').html(el);
    }

    // Function to handle short answer field (similar to text)
    function short_answer_field(_this, _field) {
        var el = $('<input>');
        el.attr({
            "type": "text",
            "name": "q[" + _field + "]",
            "class": "form-control col-sm-12",
            "placeholder": "Write your answer here"
        });
        // Append short answer input to choice field
        _this.closest('.question-item').find('.choice-field').html(el);
    }

    function add_checkbox() {
        $('.add_chk').click(function() {
            var _this = $(this)
            var _field = _this.closest('.question-item').attr('data-item')
            checkbox_field(_this, _field, "Enter Option")
        })
    }

    function add_radio() {
        $('.add_radio').click(function() {
            var _this = $(this)
            var _field = _this.closest('.question-item').attr('data-item')
            radio_field(_this, _field, "Enter Option")
        })
    }


    function paragraph(_this, _field) {
        var el = $('<textarea>')
        el.attr({
            "cols": 30,
            "rows": 5,
            "placeholder": "Write your answer here",
            "name": "q[" + _field + "]",
            "class": "form-control col-sm-12"
        })
        _this.closest('.question-item').find('.choice-field').html(el)
    }

    function file_field(_this, _field) {
        var el = $('<input>')
        el.attr({
            "type": "file",
            "name": "q[" + _field + "]",
            "class": "form-control-file"
        })
        _this.closest('.question-item').find('.choice-field').html(el)
    }

    function checkbox_field(_this, _field, _text = "option") {
        var chk = $("<div>")
        var rem = $("<div>")
        chk.attr({
            "class": "col-sm-11 d-flex align-items-center",
        })
        rem.attr({
            "class": "col-sm-1 rem-on-display",
        })
        rem.append("<button class='btn btn-sm btn-default' type='button'><span class='fa fa-times'></span></button>")
        rem.attr('onclick', "$(this).closest('.row').remove()")
        var item = create_checkbox_field(_field, _text)
        chk.append(item)
        el = $("<div class='row w-100'>")
        el.append(rem)
        el.append(chk)
        _this.closest('.question-item').find('.choice-field .add_chk').before(el)
    }

    function radio_field(_this, _field, _text = "option") {
        var chk = $("<div>")
        var rem = $("<div>")
        chk.attr({
            "class": "col-sm-11 d-flex align-items-center",
        })
        rem.attr({
            "class": "col-sm-1 rem-on-display",
        })
        rem.append("<button class='btn btn-sm btn-default' type='button'><span class='fa fa-times'></span></button>")
        rem.attr('onclick', "$(this).closest('.row').remove()")
        var item = create_radio_field(_field, _text)
        chk.append(item)
        el = $("<div class='row w-100'>")
        el.append(rem)
        el.append(chk)
        _this.closest('.question-item').find('.choice-field .add_radio').before(el)
    }



    function create_checkbox_field(_field, _text) {

        var el = $('<div>')
        el.attr({
            "class": "form-check q-fc"
        })
        var inp = $('<input>')
        inp.attr({
            "class": "form-check-input",
            "name": "q[" + _field + "][]",
            "type": "checkbox",
            "value": _text
        })
        var label = $('<label>')
        label.attr({
            "class": "form-check-label",
            "contenteditable": true,
            "title": "Enter option here"
        })
        label.text(_text)
        el.append(inp)
        el.append(label)
        return el
    }

    function create_radio_field(_field, _text) {

        var el = $('<div>')
        el.attr({
            "class": "form-check q-fc"
        })
        var inp = $('<input>')
        inp.attr({
            "class": "form-check-input",
            "name": "q[" + _field + "]",
            "type": "radio",
            "value": _text
        })
        var label = $('<label>')
        label.attr({
            "class": "form-check-label",
            "contenteditable": true,
            "title": "Enter option here"
        })
        label.text(_text)
        el.append(inp)
        el.append(label)
        return el
    }
    _initilize()

    function save_form() {
        formTi
        var new_el = $('<div>')
        var form_el = $('#form-field').clone()
        var form_code = $("[name='form_code']").length > 0 ? $("[name='form_code']").val() : "";
        var title = $('#form-title').text()
        var description = $('#form-description').text()
        form_el.find("[name='form_code']").remove()
        new_el.append(form_el)
        start_loader()
        $.ajax({
            url: "classes/Forms.php?a=save_form",
            method: 'POST',
            data: { form_data: new_el.html(), description: description, title: title, form_code: form_code },
            dataType: 'json',
            error: err => {
                console.log(err)
                alert("an error occured")
            },
            success: function(resp) {
                if (typeof resp == 'object' && resp.status == 'success') {
                    alert("Form successfully saved")
                    location.href = "./"
                } else {
                    console.log(resp)
                    alert("an error occured")
                }
                end_loader()
            }
        })
    }
    $('#save_form').click(function() {
        save_form()
    })
})