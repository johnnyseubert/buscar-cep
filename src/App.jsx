import axios from 'axios';
import React, { useState } from 'react';

export const App = () => {
   const [cep, setCep] = useState('');
   const [logradouro, setLogradouro] = useState('');
   const [complemento, setComplemento] = useState('');
   const [bairro, setBairro] = useState('');
   const [localidade, setLocalidade] = useState('');
   const [uf, setUf] = useState('');
   const [ddd, setDDD] = useState('');
   const [erro, setErro] = useState(false);

   const salvarCep = (event) => {
      setCep(event.target.value);
   };

   const buscarCep = (event) => {
      event.preventDefault();

      if (cep.length < 8) {
         return setErro(true);
      }

      axios
         .get(`https://viacep.com.br/ws/${cep}/json/`)
         .then((resposta) => {
            let { logradouro, complemento, bairro, localidade, uf, ddd } =
               resposta.data;
            setLogradouro(logradouro);
            setComplemento(complemento);
            setBairro(bairro);
            setLocalidade(localidade);
            setUf(uf);
            setDDD(ddd);
            setErro(false);
         })
         .catch((error) => setErro(true));
   };

   return (
      <>
         <div className="screen">
            <h2>Buscar seu CEP</h2>

            <form onSubmit={buscarCep}>
               <div className="form-search">
                  <input
                     type="text"
                     placeholder="exemplo: *****-***"
                     onChange={salvarCep}
                     maxLength={9}
                  />
                  <button>Buscar Cep</button>
               </div>

               <div className="form-info">
                  <div className="form-group">
                     <label>Logradouro</label>
                     <input type="text" disabled value={logradouro} />
                  </div>

                  <div className="form-group">
                     <label>Complemento</label>
                     <input type="text" disabled value={complemento} />
                  </div>

                  <div className="form-group">
                     <label>Bairro</label>
                     <input type="text" disabled value={bairro} />
                  </div>

                  <div className="form-group">
                     <label>Localidade</label>
                     <input type="text" disabled value={localidade} />
                  </div>

                  <div className="form-group">
                     <label>UF</label>
                     <input type="text" disabled value={uf} />
                  </div>

                  <div className="form-group">
                     <label>DDD</label>
                     <input type="text" disabled value={ddd} />
                  </div>
               </div>
            </form>
         </div>

         {erro && (
            <div className="modal-wrapper">
               <div className="modal-content">
                  <span style={{ color: 'red' }}>
                     Favor informar um CEP Válido!
                  </span>
                  <button onClick={() => setErro(false)}>Fechar Modal</button>
               </div>
            </div>
         )}
      </>
   );
};
