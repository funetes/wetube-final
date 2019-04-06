import routes from "./router";
import multer from "multer";

const multerVideo = multer({ dest: "videos/" });

export const localsMiddlewares = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: true,
    id: 1
  };
  next();
};

export const uploadVideo = multerVideo.single("videoFile");
