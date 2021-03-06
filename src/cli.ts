
/* IMPORT */

import * as _ from 'lodash';
import * as caporal from 'caporal';
import * as readPkg from 'read-pkg-up';
import Utils from './utils';
import Watch from '.';

/* CLI */

async function CLI () {

  const {pkg} = await readPkg ({ cwd: __dirname });

  caporal
    .version ( pkg.version )
    .argument ( '[title]', 'Video title' )
    .argument ( '[-- webtorrent options...]', 'WebTorrent options' )
    .action ( async ( args ) => {

      await Utils.checkConnection ();

      args = _.castArray ( args.title || [] ).concat ( args.webtorrentOptions );

      const doubleDashIndex = args.findIndex ( x => x === '--' ),
            hasWebtorrentOptions = ( doubleDashIndex >= 0 ),
            title = hasWebtorrentOptions ? args.slice ( 0, doubleDashIndex ).join ( ' ' ) : args.join ( ' ' ),
            webtorrentOptions = hasWebtorrentOptions ? args.slice ( doubleDashIndex + 1 ) : [];

      if ( !title ) return Watch.wizard ( webtorrentOptions );

      return Watch.lucky ( title, webtorrentOptions );

    });

  caporal.parse ( process.argv );

}

/* EXPORT */

export default CLI;
