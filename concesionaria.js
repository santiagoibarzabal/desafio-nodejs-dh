const autos = require("./autos");
const persona = require("./persona");

const concesionaria = {
   autos: autos,
   buscarAuto: function(patente){
    for(let i=0; i<this.autos.length; i++){
      if(patente === autos[i].patente){
        return autos[i];
      } 
    } return null; 
   },
   venderAuto: function(patente){
    const auto = this.buscarAuto(patente);
    if(auto) {
      auto.vendido = true;
    }
   },
   autosParaLaVenta: function(){
      return this.autos.filter(auto => auto.vendido === false);
   },
   autosNuevos: function(){
      return this.autosParaLaVenta().filter(auto => auto.km < 100);
   },
   listaDeVentas: function(){
      const autosVendidos = this.autos.filter(auto => auto.vendido === true);
      return autosVendidos.map(auto => auto.precio); 
   },
   totalDeVentas: function(){
     const funcionDelReduce = (acumulador, valorActual) => acumulador + valorActual;
     return this.listaDeVentas().reduce(funcionDelReduce, 0);
   }, 
   puedeComprar: function(auto, persona){
    const valorDeUnaCuota = auto.precio / auto.cuotas;
    const puedePagarCuotas = persona.capacidadDePagoEnCuotas >= valorDeUnaCuota;
    const puedePagarPrecioTotal = persona.capacidadDePagoTotal >= auto.precio;
    const resultadoFinal = puedePagarCuotas && puedePagarPrecioTotal;
    return resultadoFinal;
  }, 
   autosQuePuedeComprar: function(persona){
     const autosParaLaVenta = this.autosParaLaVenta();
     const puedeComprarlos = autosParaLaVenta.filter(auto => this.puedeComprar(auto, persona));
     return puedeComprarlos;
   }
};

