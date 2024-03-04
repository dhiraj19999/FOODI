import { Menu } from ".././model/menu.model.js";

export const getMenu = async (req, res) => {
  try {
    const menu = await Menu.find();
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
