const PUBLICATION_TYPE = {
    POST: "POST",
    QUOTE: "QUOTE",
    COMMENT: "COMMENT"
};

const CONTENT_WARNING_TYPE = {
    NSFW: "NSFW",
    SENSITIVE: "SENSITIVE",
    SPOILER: "SPOILER"
};

const METADATA_MAIN_FOCUS_TYPE = {
    VIDEO: "VIDEO",
    IMAGE: "IMAGE",
    ARTICLE: "ARTICLE",
    TEXT_ONLY: "TEXT_ONLY",
    AUDIO: "AUDIO",
    LINK: "LINK",
    EMBED: "EMBED",
    CHECKING_IN: "CHECKING_IN",
    EVENT: "EVENT",
    MINT: "MINT",
    TRANSACTION: "TRANSACTION",
    LIVESTREAM: "LIVESTREAM",
    SHORT_VIDEO: "SHORT_VIDEO",
    THREE_D: "THREE_D",
    STORY: "STORY",
    SPACE: "SPACE"
};

return {
    CONTENT_WARNING_TYPE,
    METADATA_MAIN_FOCUS_TYPE,
    PUBLICATION_TYPE
};