/**
 * Refer to earlier commit for full type implementation
 * Can't think what to do of the rest for now...
 * Bunch of cool info that could be added to art page
 * @url: https://data.rijksmuseum.nl/object-metadata/api/
 */
export type RijksDataApiResponse = {
  artObjects?: ArtObject[];
  artObject?: ArtObject;
};

export type ArtObject = {
  id?: string;
  objectNumber?: string;
  title?: string;
  webImage?: Image;
  longTitle?: string;
  principalOrFirstMaker?: string;
  principalMaker?: string;
  plaqueDescriptionEnglish?: string;
  subTitle?: string;
  location?: string;
  label?: Label;
};

type Label = {
  makerLine?: string;
  description?: string;
};

type Image = {
  url?: string;
};
