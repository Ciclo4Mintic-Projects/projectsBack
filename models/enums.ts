enum Enum_Rol {
  ESTUDIANTE = 'ESTUDIANTE',
  LIDER = 'LIDER',
  ADMINISTRADOR = 'ADMINISTRADOR',
}

enum Enum_EstadoUsuario {
  PENDIENTE = 'PENDIENTE',
  AUTORIZADO = 'AUTORIZADO',
  NO_AUTORIZADO = 'NO_AUTORIZADO',
}

enum Enum_EstadoProyecto {
  ACTIVO = 'ACTIVO',
  INACTIVO = 'INACTIVO',
}

enum Enum_Fase {
  INICIADO = 'INICIADO',
  DESARROLLO = 'DESARROLLO',
  TERMINADO = 'TERMINADO',
  NULO = '',
}

enum Enum_EstadoInscripcion {
  ACEPTADO = 'ACEPTADO',
  RECHAZADO = 'RECHAZADO',
}

enum Enum_TipoObjetivo {
  GENERAL = 'GENERAL',
  ESPECIFICO = 'ESPECIFICO',
}

export { Enum_Rol, Enum_EstadoUsuario, Enum_EstadoProyecto, Enum_Fase, Enum_EstadoInscripcion, Enum_TipoObjetivo };
