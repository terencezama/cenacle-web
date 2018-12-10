export default (src, component, stateId) => {
    const promise = new Promise(function (resolve, reject) {
        var script = document.createElement('script');
        script.src = src;
        script.addEventListener('load', function () {
            resolve();
        });
        script.addEventListener('error', function (e) {
            reject(e);
        });
        document.body.appendChild(script);
    })
    let key = {};
     const do_load = () =>{
        promise.then(() => {
            key[`${stateId}`]= 'done';
            component.setState(key);
        }).catch(() => {
            key[`${stateId}`]= 'error';
            component.setState(key);
        })
     }
    return {
        do_load
    }


}
