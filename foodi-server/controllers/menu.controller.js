import { Menu } from ".././model/menu.model.js";

export const getMenu = async (req, res) => {
  try {
    const menu = await Menu.find();
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const addToMenu = async (req, res) => {
  const menuItem = req.body;
  try {
    console.log(menuItem);
    const result = await Menu.create(menuItem);
    res
      .status(200)
      .json({ message: "Item Added to menu successfully", item: result });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteMenuItem = async (req, res) => {
  try {
    const id = req.params.id;
    // const filter = { _id: new ObjectId(id) };

    // const result = await Cart.deleteOne(filter);
    const prod = await Menu.findById(id);
    console.log("result", prod);
    const result = await Menu.findByIdAndDelete(id);

    if (result) {
      res.status(200).json({ message: "Item deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
};

export const SingleMenuItem = async (req, res) => {
  const id = req.params.id;
  try {
    const item = await Menu.findOne({ _id: id });
    res.status(200).json({ item: item });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const UpdateMenuItem = async (req, res) => {
  const id = req.params.id;
  const { name, recipe, image, category, price } = req.body;
  try {
    const updateMenu = await Menu.findByIdAndUpdate(
      id,
      { name, recipe, image, category, price },
      { new: true, runValidators: true }
    );
    if (!updateMenu) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.status(200).json({ message: "Item updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
