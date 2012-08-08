
/*global repoData categories languageOverride descriptionOverride*/
/*jshint browser:true*/

(function() {

  function main() {
    document.getElementById('loading').style.display = 'none'
    var data = repoData.data
      , i
    for (i = 0; i < categories.length; i ++) {
      category(categories[i])
    }
    for (i = 0; i < data.length; i ++) {
      repository(data[i])
    }
    display()
  }

  function C(nodeName, className) {
    var el = document.createElement(nodeName)
    if (className) el.className = className
    return el
  }

  var mapRepoNameToCategory = {}
    , repositoryMap = {}
    , uncategorized = []
    , forks = []

  function category(cat) {
    for (var i = 0; i < cat.repositories.length; i ++) {
      mapRepoNameToCategory[cat.repositories[i]] = cat
    }
  }

  function repository(repo) {
    var object = Repository(repo)
    repositoryMap[repo.name] = object
    if (!mapRepoNameToCategory[repo.name]) {
      if (repo.fork) {
        forks.push(repo.name)
      } else {
        uncategorized.push(repo.name)
      }
    }
  }

  function Repository(repo) {
    function renderTo(container) {
      var el = C('div', 'repository')
        , header = C('h3', 'name')
        , p = C('p', 'description')
        , language

      language = languageOverride[repo.name] || repo.language || ''

      header.innerHTML = '<a href="' + repo.html_url + '">'
        + repo.name + '</a> <small>' + language + '</small>'
      p.innerHTML = descriptionOverride[repo.name] || repo.description
      el.appendChild(header)
      el.appendChild(p)
      container.appendChild(el)
    }
    return {
      renderTo: renderTo
    }
  }

  function display() {
    if (uncategorized.length > 0) {
      displayCategory('New Uncategorized Repositories', uncategorized)
    }
    for (var i = 0; i < categories.length; i ++) {
      var category = categories[i]
      if (category.name != 'unlist') {
        displayCategory(category.name, category.repositories)
      }
    }
    displayCategory('Forks', forks)
  }

  function displayCategory(name, repositories) {
    var el = C('div', 'category span6')
      , h2 = C('h2')
      , list = C('div', 'repo-list')
    h2.innerHTML = name
    el.appendChild(C('hr'))
    el.appendChild(h2)
    el.appendChild(list)
    for (var i = 0; i < repositories.length; i ++) {
      displayRepository(repositories[i], list)
    }
    show(el)
  }

  function displayRepository(name, parent) {
    repositoryMap[name].renderTo(parent)
  }

  var rowCount = null
    , rowElement

  function show(el) {
    if (rowCount == null || rowCount == 2) {
      rowCount = 0
      rowElement = C('div', 'row')
      document.getElementById('repos').appendChild(rowElement)
    }
    rowElement.appendChild(el)
    rowCount++
  }

  main()

})()


