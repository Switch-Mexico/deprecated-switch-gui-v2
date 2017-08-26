import TransmissionLines from '../../collections/transmissionLines';

export default function() {
  let file = TransmissionLines.find().fetch();
  return file;
}
