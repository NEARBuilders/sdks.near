const PUBLICATION_REQUEST = {
  forId: "",
  forTxHash: "",
};

const PUBLICATIONS_WHERE_REQUEST = {
  publicationIds: [],
  from: [],
  publicationTypes: ["POST"],
  commentOn: {},
  mirrorOn: "",
  quoteOn: "",
  withOpenActions: [],
  actedBy: "",
  metadata: {},
  customFilters: ["GARDENERS"],
};

const PUBLICATIONS_REQUEST = {
  limit: Constants.API_REQUEST_LIMITS.TEN,
  cursor: "",
  where: PUBLICATIONS_WHERE_REQUEST,
};

return {
  PUBLICATION_REQUEST,
  PUBLICATIONS_WHERE_REQUEST,
  PUBLICATIONS_REQUEST,
};
