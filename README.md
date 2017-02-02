# Vote

Simple vote plugin for jQuery. Default classes depends on [Font Awesome](http://fontawesome.io)

Example:

```html
<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">

<div  data-vote="3.25"/>

<script src="vote.js"></script>
<script type="text/javascript">
$(function() {
    $('[data-vote]').vote({
        onVote: function(voteValue, el) {
            el.vote('update', 1);
        }
    });
});
</script>
```

Settings:
```javascript
settings = {
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
}
```