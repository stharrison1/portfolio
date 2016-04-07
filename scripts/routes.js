page('/',
  projectsController.loadAll,
  projectsController.index);

page('/about', aboutController.index);

page('/article/:id',
  projectsController.loadById,
  projectsController.index);

// Redirect home if the default filter option is selected:
page('/category', '/');

page('/category/:categoryName',
  projectsController.loadByCategory,
  projectsController.index);

page();
