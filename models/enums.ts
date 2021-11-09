enum Enum_Rol {
  estudiante = 'Estudiante',
  lider = 'Líder',
  administrador = 'Administrador',
}

enum Enum_EstadoUsuario {
  pendiente = 'Pendiente',
  autorizado = 'Autorizado',
  noAutorizado = 'No autorizado',
}

enum Enum_EstadoProyecto {
  activo = 'Activo',
  inactivo = 'Inactivo',
}

enum Enum_Fase {
  iniciado = 'Iniciado',
  desarrollo = 'Desarrollo',
  terminado = 'Terminado',
}

export { Enum_Rol, Enum_EstadoUsuario, Enum_EstadoProyecto, Enum_Fase };
