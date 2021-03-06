(function($) {
    $.fn.vote = function(options) {
        methods = {
            'update': function(value) {
                return this.each(function() {
                    handleStars($(this), value);
                });
            }
        }

        if (methods[options]) {
            return methods[options].apply(this, Array.prototype.slice.call(arguments, 1));
        }

        settings = $.extend({}, $.fn.vote.defaults, options);

        function handleStars(elem, voteValue) {
            var rest = settings.stars;
            voteValue = Math.round(voteValue * 2) / 2;
            if (rest < voteValue) {
                return;
            }

            var index = 0;
            while (voteValue >= 1) {
                index = Math.floor(settings.stars - rest);
                elem.children('i').eq(index).removeClass().addClass(settings.fullCls);
                rest--;
                voteValue--;
            }

            if (voteValue > 0) {
                elem.children('i').eq(++index).removeClass().addClass(settings.halfCls);
                rest--;
            }

            while (rest > 0) {
                elem.children('i').eq(Math.floor(settings.stars - rest)).removeClass().addClass(settings.emptyCls);
                rest--;
            }
        }

        return this.each(function() {
            var value = $(this).data('vote') || settings.voteValue;
            var elem = $(this);
            var voteEnabled = !settings.voteDisabled;

            for (var i = settings.stars; i--;) {
                elem.append($('<i/>'));
            }

            handleStars(elem, value);
            elem.css(settings.css);

            if (undefined != $(this).data('vote-disabled') && 1 == $(this).data('vote-disabled')) {
                voteEnabled = false;
            }

            if (voteEnabled) {
                elem.children('i').hover(function() {
                    handleStars(elem, $(this).index()+1);
                }, function() {
                    handleStars(elem, value);
                }).on('click', function() {
                    if ($.isFunction(settings.onVote)) {
                        settings.onVote.call(this, $(this).index() + 1, elem);

                        if (settings.disableOnVote) {
                            elem.children('i').unbind('mouseenter mouseleave click');
                        }
                    }
                });
            }
        });
    };

    $.fn.vote.defaults = {
        voteValue: null,
        stars: 5,
        voteDisabled: false,
        disableOnVote: true,
        fullCls: "fa fa-star fa-2x",
        halfCls: "fa fa-star-half-o fa-2x",
        emptyCls: "fa fa-star-o fa-2x",
        css: {
            color: "#f2da00",
        },
        voteSuccess: function() {},
        onVote: function(voteValue, el) {},
    };
}(jQuery));