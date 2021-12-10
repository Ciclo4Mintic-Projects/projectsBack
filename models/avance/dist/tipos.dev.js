"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tiposAvance = void 0;

var _apolloServerExpress = require("apollo-server-express");

function _templateObject() {
  var data = _taggedTemplateLiteral(["  \n \n  type Avance {\n    _id: ID!\n    fecha: Date!\n    descripcion: String!\n    observaciones: [String]\n    proyecto: Proyecto!\n    creadoPor: Usuario!\n    titulo: String!\n  }\n\n  type RespuestaAvance {\n    mensaje: String\n    estado: String\n  }\n\n  type Query {\n    Avances: [Avance]\n    filtrarAvance(idProyecto: String!): [Avance]\n    Avance(_id: String!):Avance\n  }\n  type Mutation {\n    crearAvance(\n      fecha: Date!\n      descripcion: String!\n      proyecto: String!\n      creadoPor: String!\n      titulo:String!\n      ): RespuestaAvance\n\n    editarAvance(\n      _id: String!\n      fecha: Date\n      descripcion: String\n      proyecto: String\n      creadoPor: String\n      titulo:String\n    ):Avance\n    \n    eliminarAvance(\n      _id: String!\n    ):Avance\n\n    crearObservacion(\n      _id: String!\n      observacion: String\n    ):Avance\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var tiposAvance = (0, _apolloServerExpress.gql)(_templateObject());
exports.tiposAvance = tiposAvance;