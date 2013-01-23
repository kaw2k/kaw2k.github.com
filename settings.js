site.settings = {
    inputPath: './',
    outputPath: './public/',

    developmentUrl: '/kaw2k.github.com/public/',
    productionUrl: '/',

    trimHTML: true
}

site.orderedPosts = function () {
    return posts = _.chain(site.pages)
        .filter(function(post) {
            return post.type === 'post' && !post.hidden;
        })
        .toArray()
        .sortBy(function(post) {
            return -post.date.value;
        })
        .value();
}
