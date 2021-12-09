"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolversAvance = void 0;

var _avance = require("./avance.js");

var _inscripcion = require("../inscripcion/inscripcion.js");

var _proyecto = require("../proyecto/proyecto.js");

var resolversAvance = {
  Query: {
    Avances: function Avances(parent, args, context) {
      var inscripciones, avances, proyectos, _avances, _avances2;

      return regeneratorRuntime.async(function Avances$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(context.userData.rol === 'ESTUDIANTE')) {
                _context.next = 15;
                break;
              }

              _context.next = 3;
              return regeneratorRuntime.awrap(_inscripcion.InscripcionModel.find({
                $and: [{
                  estudiante: context.userData._id
                }, {
                  estado: "ACEPTADO"
                }]
              }));

            case 3:
              inscripciones = _context.sent;
              console.log(inscripciones);

              if (!inscripciones) {
                _context.next = 12;
                break;
              }

              _context.next = 8;
              return regeneratorRuntime.awrap(_avance.AvanceModel.find({
                proyecto: inscripciones.map(function (p) {
                  return p.proyecto;
                })
              }).populate('proyecto').populate('creadoPor'));

            case 8:
              avances = _context.sent;
              return _context.abrupt("return", avances);

            case 12:
              console.log("no hay avances");

            case 13:
              _context.next = 34;
              break;

            case 15:
              if (!(context.userData.rol === 'LIDER')) {
                _context.next = 30;
                break;
              }

              _context.next = 18;
              return regeneratorRuntime.awrap(_proyecto.ProyectoModel.find({
                lider: context.userData._id
              }));

            case 18:
              proyectos = _context.sent;
              console.log(proyectos);

              if (!proyectos) {
                _context.next = 27;
                break;
              }

              _context.next = 23;
              return regeneratorRuntime.awrap(_avance.AvanceModel.find({
                proyecto: proyectos.map(function (p) {
                  return p._id;
                })
              }).populate('proyecto').populate('creadoPor'));

            case 23:
              _avances = _context.sent;
              return _context.abrupt("return", _avances);

            case 27:
              console.log("no hay avances");

            case 28:
              _context.next = 34;
              break;

            case 30:
              _context.next = 32;
              return regeneratorRuntime.awrap(_avance.AvanceModel.find().populate('proyecto').populate('creadoPor'));

            case 32:
              _avances2 = _context.sent;
              return _context.abrupt("return", _avances2);

            case 34:
            case "end":
              return _context.stop();
          }
        }
      });
    },
    Avance: function Avance(parent, args) {
      var avance;
      return regeneratorRuntime.async(function Avance$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(_avance.AvanceModel.findOne({
                _id: args._id
              }).populate('proyecto').populate('creadoPor'));

            case 2:
              avance = _context2.sent;
              return _context2.abrupt("return", avance);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      });
    },
    filtrarAvance: function filtrarAvance(parent, args) {
      var avanceFiltrado;
      return regeneratorRuntime.async(function filtrarAvance$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(_avance.AvanceModel.find({
                proyecto: args.idProyecto
              }).populate('proyecto').populate('creadoPor'));

            case 2:
              avanceFiltrado = _context3.sent;
              return _context3.abrupt("return", avanceFiltrado);

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  },
  Mutation: {
    crearAvance: function crearAvance(parent, args) {
      var avanceCreado, filtrarAvance;
      return regeneratorRuntime.async(function crearAvance$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              console.log('args', args);
              _context4.next = 3;
              return regeneratorRuntime.awrap(_avance.AvanceModel.create({
                proyecto: args.proyecto,
                fecha: args.fecha,
                descripcion: args.descripcion,
                observaciones: args.observaciones,
                creadoPor: args.creadoPor,
                titulo: args.titulo
              }));

            case 3:
              avanceCreado = _context4.sent;
              _context4.next = 6;
              return regeneratorRuntime.awrap(_avance.AvanceModel.find({
                proyecto: args.proyecto
              }));

            case 6:
              filtrarAvance = _context4.sent;

              if (!(filtrarAvance.length === 1)) {
                _context4.next = 10;
                break;
              }

              _context4.next = 10;
              return regeneratorRuntime.awrap(_proyecto.ProyectoModel.findOneAndUpdate({
                _id: args.proyecto,
                fase: 'INICIADO'
              }, {
                fase: 'DESARROLLO'
              }));

            case 10:
              return _context4.abrupt("return", avanceCreado);

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      });
    },
    editarAvance: function editarAvance(parent, args) {
      var avanceEditado;
      return regeneratorRuntime.async(function editarAvance$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(_avance.AvanceModel.findByIdAndUpdate(args._id, {
                proyecto: args.proyecto,
                fecha: args.fecha,
                descripcion: args.descripcion,
                creadoPor: args.creadoPor,
                titulo: args.titulo
              }, {
                "new": true
              }));

            case 2:
              avanceEditado = _context5.sent;
              return _context5.abrupt("return", avanceEditado);

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      });
    },
    eliminarAvance: function eliminarAvance(parent, args) {
      var avanceEliminado;
      return regeneratorRuntime.async(function eliminarAvance$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(_avance.AvanceModel.findOneAndDelete({
                _id: args._id
              }));

            case 2:
              avanceEliminado = _context6.sent;
              return _context6.abrupt("return", avanceEliminado);

            case 4:
            case "end":
              return _context6.stop();
          }
        }
      });
    },
    crearObservacion: function crearObservacion(parent, args) {
      var observacionCreada;
      return regeneratorRuntime.async(function crearObservacion$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(_avance.AvanceModel.findByIdAndUpdate(args._id, {
                $push: {
                  observaciones: args.observacion
                }
              }, {
                "new": true
              }));

            case 2:
              observacionCreada = _context7.sent;
              return _context7.abrupt("return", observacionCreada);

            case 4:
            case "end":
              return _context7.stop();
          }
        }
      });
    }
  }
};
exports.resolversAvance = resolversAvance;