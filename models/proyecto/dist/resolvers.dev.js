"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolversProyecto = void 0;

var _proyecto = require("./proyecto.js");

var resolversProyecto = {
  Query: {
    Proyectos: function Proyectos(parent, args, context) {
      var proyectos, _proyectos, _proyectos2;

      return regeneratorRuntime.async(function Proyectos$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(context.userData.rol === 'LIDER')) {
                _context.next = 7;
                break;
              }

              _context.next = 3;
              return regeneratorRuntime.awrap(_proyecto.ProyectoModel.find({
                lider: context.userData._id
              }).populate('lider').populate('avances').populate({
                path: 'inscripciones',
                populate: {
                  path: 'estudiante'
                }
              }));

            case 3:
              proyectos = _context.sent;
              return _context.abrupt("return", proyectos);

            case 7:
              if (!(context.userData.rol === 'ESTUDIANTE')) {
                _context.next = 14;
                break;
              }

              _context.next = 10;
              return regeneratorRuntime.awrap(_proyecto.ProyectoModel.find({
                estado: "ACTIVO"
              }).populate('lider').populate('avances').populate({
                path: 'inscripciones',
                populate: {
                  path: 'estudiante'
                }
              }));

            case 10:
              _proyectos = _context.sent;
              return _context.abrupt("return", _proyectos);

            case 14:
              _context.next = 16;
              return regeneratorRuntime.awrap(_proyecto.ProyectoModel.find().populate('lider').populate('avances').populate({
                path: 'inscripciones',
                populate: {
                  path: 'estudiante'
                }
              }));

            case 16:
              _proyectos2 = _context.sent;
              return _context.abrupt("return", _proyectos2);

            case 18:
            case "end":
              return _context.stop();
          }
        }
      });
    },
    Proyecto: function Proyecto(parent, args) {
      var proyecto;
      return regeneratorRuntime.async(function Proyecto$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(_proyecto.ProyectoModel.findOne({
                _id: args._id
              }));

            case 2:
              proyecto = _context2.sent;
              return _context2.abrupt("return", proyecto);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  },
  Mutation: {
    crearProyecto: function crearProyecto(parent, args) {
      var proyectoCreado;
      return regeneratorRuntime.async(function crearProyecto$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(_proyecto.ProyectoModel.create({
                nombre: args.nombre,
                estado: args.estado,
                fase: args.fase,
                fechaInicio: args.fechaInicio,
                fechaFin: args.fechaFin,
                presupuesto: args.presupuesto,
                lider: args.lider,
                objetivoGeneral: args.objetivoGeneral,
                objetivosEspecificos: args.objetivosEspecificos
              }));

            case 2:
              proyectoCreado = _context3.sent;
              return _context3.abrupt("return", proyectoCreado);

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      });
    },
    editarProyecto: function editarProyecto(parent, args, context) {
      var proyecto, fecha, _fecha, proyectoEditado;

      return regeneratorRuntime.async(function editarProyecto$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(_proyecto.ProyectoModel.findOne({
                _id: args._id
              }));

            case 2:
              proyecto = _context4.sent;

              if (context.userData.rol === 'ADMINISTRADOR' && proyecto.estado === 'INACTIVO' && args.estado === 'ACTIVO' && proyecto.fase === 'PENDIENTE') {
                args.fase = 'INICIADO';
                fecha = new Date();
                args.fechaInicio = fecha.toISOString().split('T')[0];
              }

              if (context.userData.rol === 'ADMINISTRADOR' && proyecto.fase === 'DESARROLLO' && args.fase === 'TERMINADO') {
                args.fase = 'TERMINADO';
                _fecha = new Date();
                args.fechaFin = _fecha.toISOString().split('T')[0];
              }

              _context4.next = 7;
              return regeneratorRuntime.awrap(_proyecto.ProyectoModel.findByIdAndUpdate(args._id, {
                nombre: args.nombre,
                estado: args.estado,
                fase: args.fase,
                fechaInicio: args.fechaInicio,
                fechaFin: args.fechaFin,
                presupuesto: args.presupuesto,
                lider: args.lider,
                objetivoGeneral: args.objetivoGeneral,
                objetivosEspecificos: args.objetivosEspecificos
              }, {
                "new": true
              }));

            case 7:
              proyectoEditado = _context4.sent;
              return _context4.abrupt("return", proyectoEditado);

            case 9:
            case "end":
              return _context4.stop();
          }
        }
      });
    }
  }
};
exports.resolversProyecto = resolversProyecto;