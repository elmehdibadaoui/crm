const { getPagination } = require("../../../utils/query");
const prisma = require("../../../utils/prisma");

const createSingleRole = async (req, res) => {
  try {
    if (req.query.query === "deletemany") {
      const deletedRole = await prisma.role.deleteMany({
        where: {
          id: {
            in: req.body,
          },
        },
      });
      return res.status(200).json(deletedRole);
    } else if (req.query.query === "createmany") {
      const createdRole = await prisma.role.createMany({
        data: req.body,
        skipDuplicates: true,
      });
      return res.status(201).json(createdRole);
    } else {
      const createdRole = await prisma.role.create({
        data: {
          name: req.body.name,
        },
      });
      return res.status(200).json(createdRole);
    }
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const getAllRole = async (req, res) => {
  if (req.query.query === "all") {
    const allRole = await prisma.role.findMany({
      orderBy: [
        {
          id: "asc",
        },
      ],
    });
    return res.status(200).json(allRole);
  } else if (req.query.status === "false") {
    try {
      const { skip, limit } = getPagination(req.query);
      const allRole = await prisma.role.findMany({
        where: {
          status: false,
        },
        orderBy: [
          {
            id: "asc",
          },
        ],
        skip: Number(skip),
        take: Number(limit),
      });
      return res.status(200).json(allRole);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  } else {
    const { skip, limit } = getPagination(req.query);
    try {
      const allRole = await prisma.role.findMany({
        orderBy: [
          {
            id: "asc",
          },
        ],
        where: {
          status: true,
        },
        skip: Number(skip),
        take: Number(limit),
      });
      return res.status(200).json(allRole);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
};

const getSingleRole = async (req, res) => {
  try {
    const singleRole = await prisma.role.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        rolePermission: {
          include: {
            permission: true,
          },
        },
      },
    });
    return res.status(200).json(singleRole);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const updateSingleRole = async (req, res) => {
  try {
    const updatedRole = await prisma.role.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        name: req.body.name,
      },
    });
    return res.status(200).json(updatedRole);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const deleteSingleRole = async (req, res) => {
  try {
    const deletedRole = await prisma.role.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        status: req.body.status,
      },
    });
    return res.status(200).json(deletedRole);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  createSingleRole,
  getAllRole,
  getSingleRole,
  updateSingleRole,
  deleteSingleRole,
};
