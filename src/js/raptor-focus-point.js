var RaptorFocusPoint = (function($) {
    return {
        x: 0,
        y: 0,
        callback: null,
        dragging: false,
        template: '<div id="raptor-focus-point-dialog" style="display: none"><div id="raptor-focus-point-wrapper"><img /><div id="raptor-focus-point-cross-hair-x" class="raptor-focus-point-cross-hair"></div><div id="raptor-focus-point-cross-hair-y" class="raptor-focus-point-cross-hair"></div></div></div>',
        open: function(imageSrc, x, y, callback) {
            RaptorFocusPoint.x = x;
            RaptorFocusPoint.y = y;
            RaptorFocusPoint.callback = callback;
            var image = $('<img>').attr('src', imageSrc).hide();
            image.appendTo('body').load(function() {
                if (!$('#raptor-focus-point-dialog').length) {
                    $(RaptorFocusPoint.template).appendTo('body').dialog({
                        autoOpen: false,
                        modal: true,
                        title: 'Set Focus Point',
                        open: function() {
                            RaptorFocusPoint.updateCrossHair(RaptorFocusPoint.x, RaptorFocusPoint.y);
                        },
                        buttons: [
                            {
                                text: 'Confirm',
                                click: function() {
                                    RaptorFocusPoint.callback(RaptorFocusPoint.x, RaptorFocusPoint.y)
                                    $(this).dialog('close');
                                }
                            },
                            {
                                text: 'Cancel',
                                click: function() {
                                    $(this).dialog('close');
                                }
                            }
                        ]
                    });

                    $('#raptor-focus-point-dialog').on('click', 'img', function(event) {
                        var focusPointX = ((event.offsetX / this.width) - 0.5) * 2,
                            focusPointY = ((event.offsetY / this.height) - 0.5) * -2;
                        RaptorFocusPoint.updateCrossHair(focusPointX, focusPointY);
                    });

                    $('#raptor-focus-point-dialog').on('mousedown', 'img', function(event) {
                        RaptorFocusPoint.dragging = true;
                        event.preventDefault();
                    });

                    $('#raptor-focus-point-dialog').on('mousemove', 'img', function(event) {
                        if (RaptorFocusPoint.dragging) {
                            var focusPointX = ((event.offsetX / this.width) - 0.5) * 2,
                                focusPointY = ((event.offsetY / this.height) - 0.5) * -2;
                            RaptorFocusPoint.updateCrossHair(focusPointX, focusPointY);
                        }
                    });

                    $('html').mouseup(function() {
                        RaptorFocusPoint.dragging = false;
                    });
                }
                $('#raptor-focus-point-dialog img').replaceWith(image.show());
                $('#raptor-focus-point-dialog').dialog('open');
                $('#raptor-focus-point-dialog').dialog('option', {
                    width: Math.min(this.width + 50, $(window).width() - 100),
                    height: Math.min(this.height + 170, $(window).height() - 100)
                });
            });
        },
        updateCrossHair: function(x, y) {
            RaptorFocusPoint.x = x;
            RaptorFocusPoint.y = y;
            $('#raptor-focus-point-cross-hair-x').css('left', ((x + 1) / 2) * $('#raptor-focus-point-dialog img').get(0).width);
            $('#raptor-focus-point-cross-hair-y').css('top', ((-y + 1) / 2) * $('#raptor-focus-point-dialog img').get(0).height);
        }
    };
})(jQuery);
